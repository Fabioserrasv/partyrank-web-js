#!/bin/bash

# Script de deploy para PartyRank
set -e

echo "🚀 Iniciando deploy do PartyRank..."

# Verificar se o arquivo .env existe
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo "📋 Copie o arquivo env.example para .env e configure as variáveis:"
    echo "   cp env.example .env"
    echo "   nano .env"
    exit 1
fi

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down

# Gerar certificados SSL se não existirem
if [ ! -f docker/nginx/ssl/party-rank.win.crt ]; then
    echo "🔐 Gerando certificados SSL..."
    chmod +x docker/nginx/ssl/generate-ssl.sh
    docker run --rm -v "$(pwd)/docker/nginx/ssl:/ssl" alpine/openssl sh -c "
        apk add --no-cache openssl &&
        openssl genrsa -out /ssl/party-rank.win.key 2048 &&
        openssl req -new -x509 -key /ssl/party-rank.win.key -out /ssl/party-rank.win.crt -days 365 \
            -subj '/C=BR/ST=SP/L=SaoPaulo/O=PartyRank/OU=IT/CN=party-rank.win' &&
        chmod 600 /ssl/party-rank.win.key &&
        chmod 644 /ssl/party-rank.win.crt
    "
fi

# Build e iniciar containers
echo "🔨 Fazendo build da aplicação..."
docker-compose build --no-cache

echo "🚀 Iniciando containers..."
docker-compose up -d

# Aguardar o banco de dados estar pronto
echo "⏳ Aguardando banco de dados..."
sleep 30

# Executar migrações do Prisma
echo "🗄️ Executando migrações do banco de dados..."
docker-compose exec app npx prisma migrate deploy

# Verificar status dos containers
echo "📊 Status dos containers:"
docker-compose ps

echo "✅ Deploy concluído!"
echo "🌐 Aplicação disponível em: https://party-rank.win"
echo "📋 Para ver logs: docker-compose logs -f"
echo "🛑 Para parar: docker-compose down"
