# Dockerfile para a aplicação PartyRank Next.js - Produção
FROM node:24-alpine AS base

# Instalar dependências do sistema incluindo OpenSSL
RUN apk add --no-cache libc6-compat curl openssl openssl-dev

# Instalar dependências apenas quando necessário
FROM base AS deps
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Reconstruir o código fonte apenas quando necessário
FROM base AS builder
WORKDIR /app

# Instalar todas as dependências (incluindo dev) para build e type-check
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Gerar o cliente Prisma
RUN npx prisma generate

# Build da aplicação Next.js
RUN npm run build

# Imagem de produção
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Configurar permissões para o cache do Next.js
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiar arquivos de build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copiar schema do Prisma para migrations
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Criar diretório para uploads
RUN mkdir -p /app/public/user_images && chown nextjs:nodejs /app/public/user_images

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
