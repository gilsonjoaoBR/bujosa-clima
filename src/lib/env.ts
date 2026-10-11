const DEFAULT_SITE_URL = 'https://bujosaclima.acritech.com.br';

function readSiteUrl(): string {
  const configured = import.meta.env.VITE_SITE_URL?.trim();
  if (!configured) {
    return DEFAULT_SITE_URL;
  }
  return configured.replace(/\/+$/, '');
}

/** URL canônica resolvida em tempo de build (sem barra final). */
export const siteUrl = readSiteUrl();

/** Valor bruto de VITE_WHATSAPP_NUMBER, exatamente como veio do ambiente. */
export const whatsappNumberRaw = import.meta.env.VITE_WHATSAPP_NUMBER ?? '';

export const isDev = import.meta.env.DEV;
