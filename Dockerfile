# ---------------------------------------------------------------------------
# Bujosa Clima - landing page estática
#
# As variáveis VITE_* são resolvidas em tempo de BUILD (o Vite as embute no
# bundle). No Coolify, cadastre-as como "Build Arguments"/variáveis de build.
# ---------------------------------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_WHATSAPP_NUMBER=""
ARG VITE_SITE_URL="https://bujosaclima.com.br"
ENV VITE_WHATSAPP_NUMBER=${VITE_WHATSAPP_NUMBER} \
    VITE_SITE_URL=${VITE_SITE_URL}

RUN npm run build

# ---------------------------------------------------------------------------
FROM nginx:alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
