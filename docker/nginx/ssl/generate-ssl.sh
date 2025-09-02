#!/bin/bash

# Script para gerar certificados SSL auto-assinados para desenvolvimento
# Para produção, use Let's Encrypt ou um certificado válido

DOMAIN="new.party-rank.win"
SSL_DIR="/etc/nginx/ssl"

echo "Gerando certificado SSL auto-assinado para $DOMAIN..."

# Criar diretório SSL se não existir
mkdir -p "$SSL_DIR"

# Gerar chave privada
openssl genrsa -out "$SSL_DIR/$DOMAIN.key" 2048

# Gerar certificado auto-assinado
openssl req -new -x509 -key "$SSL_DIR/$DOMAIN.key" -out "$SSL_DIR/$DOMAIN.crt" -days 365 \
    -subj "/C=BR/ST=SP/L=SaoPaulo/O=PartyRank/OU=IT/CN=$DOMAIN"

# Definir permissões corretas
chmod 600 "$SSL_DIR/$DOMAIN.key"
chmod 644 "$SSL_DIR/$DOMAIN.crt"

echo "Certificado SSL gerado com sucesso!"
echo "Arquivos criados:"
echo "  - $SSL_DIR/$DOMAIN.key (chave privada)"
echo "  - $SSL_DIR/$DOMAIN.crt (certificado)"
echo ""
echo "ATENÇÃO: Este é um certificado auto-assinado para desenvolvimento."
echo "Para produção, use Let's Encrypt ou um certificado válido de uma CA."
