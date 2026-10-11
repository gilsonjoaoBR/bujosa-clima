#!/usr/bin/env python3
"""Deriva a peça do crédito institucional da Acritech usada no rodapé.

O logotipo oficial é LIDO de um projeto da Acritech em modo somente leitura
(nada é escrito nem alterado lá) e apenas redimensionado, preservando
proporção, cores e o desenho original. Nenhuma marca é redesenhada.

Uso:
    python scripts/prepare-acritech-credit.py
    python scripts/prepare-acritech-credit.py --source "C:/caminho/logo-acritech.png"
"""

from __future__ import annotations

import argparse
import hashlib
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = Path(r"C:\dev\Acritech\src\assets\logo-acritech.png")
OUTPUT_DIR = ROOT / "public" / "brand"
OUTPUT_WIDTH = 360


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    args = parser.parse_args()

    source: Path = args.source
    if not source.is_file():
        raise SystemExit(f"logotipo oficial não encontrado em {source}")

    digest = hashlib.sha256(source.read_bytes()).hexdigest().upper()
    image = Image.open(source).convert("RGBA")
    height = round(OUTPUT_WIDTH * image.height / image.width)
    resized = image.resize((OUTPUT_WIDTH, height), Image.LANCZOS)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    written = []

    png = OUTPUT_DIR / "acritech-logo.png"
    resized.save(png, optimize=True)
    written.append(png)

    webp = OUTPUT_DIR / "acritech-logo.webp"
    resized.save(webp, quality=88, method=6)
    written.append(webp)

    avif = OUTPUT_DIR / "acritech-logo.avif"
    resized.save(avif, quality=72)
    written.append(avif)

    print(f"origem      : {source}")
    print(f"sha256      : {digest}")
    print(f"origem px   : {image.width}x{image.height}")
    print(f"derivado px : {resized.width}x{resized.height}")
    for path in written:
        print(f"  {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
