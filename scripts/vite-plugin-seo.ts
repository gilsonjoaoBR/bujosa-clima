import type { Plugin } from 'vite';

import { normalizePhoneNumber } from '../src/lib/whatsapp.ts';
import { buildLocalBusinessSchema } from '../src/content/schema.ts';

type SeoAssetsOptions = {
  siteUrl: string;
  whatsappNumber: string;
};

const ROUTES = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/privacidade', changefreq: 'yearly', priority: '0.3' },
];

/**
 * Injeta os dados que dependem da URL canônica configurada por ambiente:
 * canonical/Open Graph no HTML, dados estruturados, robots.txt e sitemap.xml.
 * Nada é escrito em disco durante o desenvolvimento.
 */
export function seoAssetsPlugin({ siteUrl, whatsappNumber }: SeoAssetsOptions): Plugin {
  const base = siteUrl.replace(/\/+$/, '');
  const telephone = normalizePhoneNumber(whatsappNumber);

  return {
    name: 'bujosa-clima:seo-assets',

    transformIndexHtml(html) {
      const schema = buildLocalBusinessSchema({ siteUrl: base, telephone });
      const jsonLd = JSON.stringify(schema).replace(/</g, '\\u003c');

      return html
        .replaceAll('__SITE_URL__', base)
        .replace(
          '<!-- __JSON_LD__ -->',
          () => `<script type="application/ld+json">${jsonLd}</script>`,
        );
    },

    generateBundle() {
      if (this.meta.watchMode) {
        return;
      }

      const lastmod = new Date().toISOString().slice(0, 10);
      const urls = ROUTES.map(
        (route) =>
          [
            '  <url>',
            `    <loc>${base}${route.path}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            `    <changefreq>${route.changefreq}</changefreq>`,
            `    <priority>${route.priority}</priority>`,
            '  </url>',
          ].join('\n'),
      ).join('\n');

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      });
    },
  };
}
