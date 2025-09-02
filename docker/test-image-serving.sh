#!/bin/bash

# Script para testar se as imagens estão sendo servidas corretamente

echo "🧪 Testando serviço de imagens..."

# Verificar se os containers estão rodando
echo "📋 Verificando status dos containers..."
docker-compose ps

echo ""
echo "🔍 Testando endpoint de imagens..."

# Testar imagem padrão
echo "📸 Testando imagem padrão..."
curl -I "http://localhost/api/user-images/user_images/default_user_profilepic.png" 2>/dev/null | head -1

# Testar imagem específica (se existir)
echo "📸 Testando imagem teste.jpg..."
curl -I "http://localhost/api/user-images/user_images/teste.jpg" 2>/dev/null | head -1

# Testar imagem que não existe (deve retornar imagem padrão)
echo "📸 Testando imagem inexistente..."
curl -I "http://localhost/api/user-images/user_images/naoexiste.jpg" 2>/dev/null | head -1

echo ""
echo "📁 Verificando arquivos no container..."
docker exec -it partyrank-app ls -la /app/public/user_images/ 2>/dev/null || echo "❌ Container não está rodando"

echo ""
echo "🌐 Testando URLs antigas (devem retornar 404)..."
curl -I "http://localhost/user_images/teste.jpg" 2>/dev/null | head -1

echo ""
echo "✅ Teste concluído!"
echo ""
echo "💡 URLs corretas agora:"
echo "   - Imagem padrão: /api/user-images/user_images/default_user_profilepic.png"
echo "   - Imagem de usuário: /api/user-images/user_images/{username}.{ext}"
echo ""
echo "🔄 Para aplicar as mudanças:"
echo "   1. docker-compose restart"
echo "   2. Testar as URLs acima"
