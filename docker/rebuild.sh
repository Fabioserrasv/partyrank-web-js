#!/bin/bash

# Script para rebuild completo da aplicação
set -e

echo "🔄 Fazendo rebuild completo da aplicação..."

# Parar todos os containers
echo "🛑 Parando containers..."
docker-compose down

# Remover imagens antigas
echo "🗑️ Removendo imagens antigas..."
docker-compose down --rmi all --volumes --remove-orphans

# Limpar cache do Docker
echo "🧹 Limpando cache do Docker..."
docker system prune -f

# Rebuild completo
echo "🔨 Fazendo rebuild completo..."
docker-compose build --no-cache

# Iniciar containers
echo "🚀 Iniciando containers..."
docker-compose up -d

# Aguardar containers estarem prontos
echo "⏳ Aguardando containers estarem prontos..."
sleep 30

# Verificar status
echo "📊 Status dos containers:"
docker-compose ps

echo "✅ Rebuild concluído!"
echo "📋 Para ver logs: docker-compose logs -f"
