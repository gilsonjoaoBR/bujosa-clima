#!/usr/bin/env python3
"""Derive web-ready brand assets from the approved Bujosa Clima identity sheet.

The approved original (docs/identidade/BujosaClima_Identidade_Aprovada.png) is a
read-only input: this script never writes to it, never recolours the artwork and
never re-typesets the wordmark. Everything it emits is a separate derived file
whose provenance is recorded in docs/identidade/DERIVADOS.md.

Derived outputs
---------------
public/brand/bujosa-clima-simbolo.{png,webp,avif}   monogram only, transparent
public/brand/bujosa-clima-logo.{png,webp,avif}      full stacked lockup, transparent
public/brand/bujosa-clima-simbolo-chip.png          monogram on a #F5FAFC rounded chip
public/icon-512.png, public/icon-192.png            app icons (from the chip)
public/apple-touch-icon.png                         180px iOS icon
public/favicon.ico                                  16/32/48 multi-size icon
public/og-bujosa-clima.png                          1200x630 social preview

Usage:
    python scripts/extract-identity-assets.py
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "identidade" / "BujosaClima_Identidade_Aprovada.png"
BRAND_DIR = ROOT / "public" / "brand"
VALIDATION_DIR = ROOT / "docs" / "identidade" / "validacao"

# Official palette (docs/agenda equivalent: approved identity sheet).
NAVY = (16, 43, 70)  # #102B46
BLUE = (8, 126, 175)  # #087EAF
ICE = (245, 250, 252)  # #F5FAFC
TEAL = (39, 166, 160)  # #27A6A0

# Crop windows measured on the 1536x1024 sheet. The panel's left edge sits at
# x=692, so the lockup window stops at 688 and a guard drops any leftover panel
# columns. The dark panel itself is a read-only reference used to validate the
# transparent extraction against the approved dark rendition.
LOCKUP_WINDOW = (30, 45, 688, 495)
DARK_PANEL_WINDOW = (706, 6, 1124, 352)
EDGE_GUARD_COLUMNS = 6

BG_FLOOR = 6.0  # residual below this is treated as page background
BG_CEIL = 26.0  # residual at or above this is treated as fully opaque artwork
ALPHA_GATE = 0.18  # cut the faintest gradient residue near the top of the ramp
MIN_COMPONENT = 40  # px, drops JPEG-ish speckle from the sheet's own texture


def load_sheet() -> np.ndarray:
    return np.asarray(Image.open(SOURCE).convert("RGB")).astype(np.float64)


def estimate_background(rgb: np.ndarray) -> np.ndarray:
    """Fit a plane to the near-white pixels so the sheet's soft gradient cancels."""
    height, width, _ = rgb.shape
    high = rgb.max(axis=2)
    low = rgb.min(axis=2)
    candidates = (low > 232.0) & ((high - low) < 20.0)
    ys, xs = np.nonzero(candidates)
    if ys.size < 64:
        return np.full_like(rgb, 255.0)
    design = np.stack([xs, ys, np.ones_like(xs)], axis=1).astype(np.float64)
    coeffs, *_ = np.linalg.lstsq(design, rgb[ys, xs], rcond=None)
    grid_y, grid_x = np.mgrid[0:height, 0:width]
    full = np.stack([grid_x.ravel(), grid_y.ravel(), np.ones(height * width)], axis=1)
    return (full @ coeffs).reshape(height, width, 3).clip(0.0, 255.0)


def drop_speckle(alpha: np.ndarray, min_area: int = MIN_COMPONENT) -> np.ndarray:
    labels, count = ndimage.label(alpha > 0.5)
    if count == 0:
        return alpha
    areas = ndimage.sum(np.ones_like(labels), labels, index=range(1, count + 1))
    keep = np.concatenate([[False], np.asarray(areas) >= min_area])
    return np.where(keep[labels], alpha, 0.0)


def drop_edge_bleed(alpha: np.ndarray, columns: int = EDGE_GUARD_COLUMNS) -> np.ndarray:
    """Null out any tall near-edge columns (leftovers from the presentation panel)."""
    guard = alpha.copy()
    ratio = (alpha > 0.3).mean(axis=0)
    tall = ratio > 0.7
    kill = np.zeros(alpha.shape[1], dtype=bool)
    kill[:columns] = tall[:columns]
    kill[-columns:] = tall[-columns:]
    guard[:, kill] = 0.0
    return guard


def to_rgba(rgb: np.ndarray, background: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """Alpha-matte the artwork off its background, keeping the original colours."""
    residual = rgb - background
    magnitude = np.abs(residual).max(axis=2)
    alpha = np.clip((magnitude - BG_FLOOR) / (BG_CEIL - BG_FLOOR), 0.0, 1.0)
    alpha = ndimage.gaussian_filter(alpha, 0.6)
    alpha = np.clip((alpha - ALPHA_GATE) / (1.0 - ALPHA_GATE), 0.0, 1.0)
    alpha = drop_speckle(alpha)
    alpha = drop_edge_bleed(alpha)
    # Un-premultiply so antialiased edge pixels keep their true colour.
    colour = np.clip(background + residual / np.maximum(alpha, 0.05)[..., None], 0.0, 255.0)
    colour = np.where(alpha[..., None] < 0.02, background, colour)
    return colour, alpha


def alpha_bbox(alpha: np.ndarray, threshold: float = 0.05) -> tuple[int, int, int, int]:
    mask = alpha > threshold
    rows = np.where(mask.any(axis=1))[0]
    cols = np.where(mask.any(axis=0))[0]
    return int(cols[0]), int(rows[0]), int(cols[-1]) + 1, int(rows[-1]) + 1


def row_gaps(alpha: np.ndarray) -> list[tuple[int, int]]:
    """Runs of fully empty rows, used to split monogram from wordmark."""
    empty = (alpha > 0.5).sum(axis=1) == 0
    gaps: list[tuple[int, int]] = []
    start: int | None = None
    for index, is_empty in enumerate(empty):
        if is_empty and start is None:
            start = index
        elif not is_empty and start is not None:
            gaps.append((start, index))
            start = None
    if start is not None:
        gaps.append((start, len(empty)))
    return gaps


def crop_rgba(image: Image.Image, box: tuple[int, int, int, int]) -> Image.Image:
    return image.crop(box)


def trim(image: Image.Image) -> Image.Image:
    alpha = np.asarray(image)[..., 3].astype(np.float64) / 255.0
    box = alpha_bbox(alpha)
    pad = 2
    left = max(box[0] - pad, 0)
    top = max(box[1] - pad, 0)
    right = min(box[2] + pad, image.width)
    bottom = min(box[3] + pad, image.height)
    return image.crop((left, top, right, bottom))


def save_set(image: Image.Image, stem: Path, *, quality: int = 92) -> list[Path]:
    written = []
    png = stem.with_suffix(".png")
    image.save(png, optimize=True)
    written.append(png)
    webp = stem.with_suffix(".webp")
    image.save(webp, quality=quality, method=6)
    written.append(webp)
    try:
        avif = stem.with_suffix(".avif")
        image.save(avif, quality=max(quality - 8, 50))
        written.append(avif)
    except Exception as error:  # pragma: no cover - depends on local Pillow build
        print(f"  ! AVIF skipped for {stem.name}: {error}")
    return written


def rounded_chip(monogram: Image.Image, size: int, inset: float = 0.21) -> Image.Image:
    chip = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(chip)
    radius = int(size * 0.22)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=ICE + (255,))
    art_width = int(size * (1 - 2 * inset))
    art_height = int(art_width * monogram.height / monogram.width)
    art = monogram.resize((art_width, art_height), Image.LANCZOS)
    chip.alpha_composite(art, ((size - art_width) // 2, (size - art_height) // 2))
    return chip


def load_font(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    name = "segoeuib.ttf" if bold else "segoeui.ttf"
    return ImageFont.truetype(f"C:/Windows/Fonts/{name}", size)


def build_og_image(lockup: Image.Image, out: Path) -> None:
    width, height = 1200, 630
    band_height = 118
    canvas = Image.new("RGB", (width, height), ICE)
    draw = ImageDraw.Draw(canvas)
    # Approved-colour footer band: teal -> blue diagonal wash.
    band = Image.new("RGB", (width, band_height), TEAL)
    band_draw = ImageDraw.Draw(band)
    for x in range(width):
        ratio = x / (width - 1)
        colour = tuple(
            int(TEAL[channel] + (BLUE[channel] - TEAL[channel]) * ratio) for channel in range(3)
        )
        band_draw.line([(x, 0), (x, band_height)], fill=colour)
    canvas.paste(band, (0, height - band_height))

    logo_width = 430
    logo = lockup.resize(
        (logo_width, int(logo_width * lockup.height / lockup.width)), Image.LANCZOS
    )
    canvas.paste(logo, ((width - logo.width) // 2, 62), logo)

    draw.text(
        (width // 2, 420),
        "Instalação, manutenção e higienização de ar-condicionado split",
        font=load_font(32),
        fill=NAVY,
        anchor="mm",
    )
    draw.text(
        (width // 2, height - band_height // 2),
        "Maricá • São Gonçalo • Niterói — RJ",
        font=load_font(34),
        fill=(255, 255, 255),
        anchor="mm",
    )
    canvas.save(out, optimize=True)
    print(f"  og image -> {out.relative_to(ROOT)}")


def main() -> None:
    BRAND_DIR.mkdir(parents=True, exist_ok=True)
    VALIDATION_DIR.mkdir(parents=True, exist_ok=True)

    sheet = load_sheet()

    x0, y0, x1, y1 = LOCKUP_WINDOW
    window = sheet[y0:y1, x0:x1]
    background = estimate_background(window)
    colour, alpha = to_rgba(window, background)
    rgba = np.dstack([colour, alpha * 255.0]).astype(np.uint8)
    lockup = trim(Image.fromarray(rgba, "RGBA"))
    print(f"lockup trimmed: {lockup.width}x{lockup.height}")

    alpha_trimmed = np.asarray(lockup)[..., 3].astype(np.float64) / 255.0
    gaps = [
        gap
        for gap in row_gaps(alpha_trimmed)
        if gap[0] != 0 and gap[1] != alpha_trimmed.shape[0] and gap[1] - gap[0] > 6
    ]
    print("interior row gaps:", gaps)
    if not gaps:
        raise SystemExit("could not split monogram from wordmark: no interior gap found")
    split = max(gaps, key=lambda gap: gap[1] - gap[0])
    monogram = lockup.crop((0, 0, lockup.width, split[0]))
    monogram = trim(monogram)
    print(f"monogram trimmed: {monogram.width}x{monogram.height}")

    written = []
    written += save_set(lockup, BRAND_DIR / "bujosa-clima-logo")
    written += save_set(monogram, BRAND_DIR / "bujosa-clima-simbolo")

    chip = rounded_chip(monogram, 512)
    chip_path = BRAND_DIR / "bujosa-clima-simbolo-chip.png"
    chip.save(chip_path, optimize=True)
    written.append(chip_path)
    for size, name in ((512, "icon-512.png"), (192, "icon-192.png"), (180, "apple-touch-icon.png")):
        target = ROOT / "public" / name
        chip.resize((size, size), Image.LANCZOS).save(target, optimize=True)
        written.append(target)
    favicon = ROOT / "public" / "favicon.ico"
    chip.save(
        favicon,
        sizes=[(16, 16), (32, 32), (48, 48)],
        format="ICO",
    )
    written.append(favicon)

    build_og_image(lockup, ROOT / "public" / "og-bujosa-clima.png")

    # --- validation composites -------------------------------------------------
    dark = sheet[
        DARK_PANEL_WINDOW[1] : DARK_PANEL_WINDOW[3], DARK_PANEL_WINDOW[0] : DARK_PANEL_WINDOW[2]
    ]
    dark_panel = Image.fromarray(dark.astype(np.uint8), "RGB")
    monogram_over_navy = Image.new("RGB", monogram.size, NAVY)
    monogram_over_navy.paste(monogram, (0, 0), monogram)
    lockup_over_ice = Image.new("RGB", lockup.size, ICE)
    lockup_over_ice.paste(lockup, (0, 0), lockup)

    def side_by_side(left: Image.Image, right: Image.Image, out: Path, gap: int = 24) -> None:
        height = max(left.height, right.height)
        canvas = Image.new("RGB", (left.width + gap + right.width, height), ICE)
        canvas.paste(left, (0, 0))
        canvas.paste(right, (left.width + gap, 0))
        canvas.save(out)
        print(f"  validation -> {out.relative_to(ROOT)}")

    side_by_side(
        monogram_over_navy,
        dark_panel,
        VALIDATION_DIR / "simbolo-sobre-navy-vs-painel-aprovado.png",
    )
    lockup_over_ice.save(VALIDATION_DIR / "lockup-sobre-branco-gelo.png")
    print(f"  validation -> {(VALIDATION_DIR / 'lockup-sobre-branco-gelo.png').relative_to(ROOT)}")

    print("\nwritten files:")
    for path in written:
        print(f"  {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
