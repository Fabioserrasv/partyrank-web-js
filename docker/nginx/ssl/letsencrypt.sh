#!/bin/bash

# Script para configurar Let's Encrypt com Certbot
# Execute este script após configurar o DNS para party-rank.win

DOMAIN="party-rank.win"
EMAIL="admin@party-rank.win"  # Altere para seu email

echo "🔐 Configurando Let's Encrypt para $DOMAIN..."

# Parar o nginx temporariamente
docker-compose stop nginx

# Executar certbot para obter certificados
docker run --rm -v "$(pwd)/docker/nginx/ssl:/etc/letsencrypt" \
    -v "$(pwd)/docker/nginx/certbot:/var/www/certbot" \
    certbot/certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

# Criar links simbólicos para os certificados
ln -sf /etc/letsencrypt/live/$DOMAIN/fullchain.pem docker/nginx/ssl/$DOMAIN.crt
ln -sf /etc/letsencrypt/live/$DOMAIN/privkey.pem docker/nginx/ssl/$DOMAIN.key

# Reiniciar nginx
docker-compose up -d nginx

echo "✅ Certificados Let's Encrypt configurados!"
echo "🔄 Para renovação automática, adicione ao crontab:"
echo "   0 12 * * * cd $(pwd) && docker run --rm -v $(pwd)/docker/nginx/ssl:/etc/letsencrypt -v $(pwd)/docker/nginx/certbot:/var/www/certbot certbot/certbot renew --quiet && docker-compose restart nginx"
