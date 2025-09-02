#!/bin/bash

# Script para rebuild do banco de dados com as configurações corretas
echo "🔄 Rebuildando o container do banco de dados..."

# Parar e remover o container do banco
echo "⏹️ Parando container do banco..."
docker-compose stop mariadb

echo "🗑️ Removendo container do banco..."
docker-compose rm -f mariadb

# Remover o volume do banco (CUIDADO: isso apaga todos os dados!)
echo "⚠️ Removendo volume do banco (todos os dados serão perdidos)..."
docker volume rm partyrank-web-js_mariadb_data

# Rebuildar o container
echo "🔨 Rebuildando container do banco..."
docker-compose up -d mariadb

# Aguardar o banco inicializar
echo "⏳ Aguardando inicialização do banco..."
sleep 30

# Verificar se o container está rodando
echo "✅ Verificando status do container..."
docker-compose ps mariadb

echo "🎉 Rebuild concluído! O usuário partyrank_user deve estar funcionando corretamente."
echo "💡 Para testar: docker exec -it partyrank-mariadb mysql -u partyrank_user -p"
