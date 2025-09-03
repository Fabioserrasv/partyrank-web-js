#!/bin/bash

# Script para gerenciar o banco de dados MariaDB para desenvolvimento local

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para mostrar ajuda
show_help() {
    echo -e "${BLUE}Script de Gerenciamento do Banco de Dados de Desenvolvimento${NC}"
    echo ""
    echo "Uso: $0 [COMANDO]"
    echo ""
    echo "Comandos disponíveis:"
    echo "  start     - Inicia o MariaDB para desenvolvimento"
    echo "  stop      - Para o MariaDB"
    echo "  restart   - Reinicia o MariaDB"
    echo "  status    - Mostra o status do container"
    echo "  logs      - Mostra os logs do MariaDB"
    echo "  connect   - Conecta ao banco via mysql client"
    echo "  reset     - Para, remove volumes e inicia novamente (CUIDADO!)"
    echo "  help      - Mostra esta ajuda"
    echo ""
    echo "Exemplos:"
    echo "  $0 start"
    echo "  $0 connect"
    echo "  $0 logs"
}

# Função para verificar se o arquivo .env existe
check_env() {
    if [ ! -f .env ]; then
        echo -e "${YELLOW}⚠️  Arquivo .env não encontrado. Criando a partir do env.example...${NC}"
        cp env.example .env
        echo -e "${GREEN}✅ Arquivo .env criado! Edite-o se necessário.${NC}"
    fi
}

# Função para iniciar o banco
start_db() {
    echo -e "${BLUE}🚀 Iniciando MariaDB para desenvolvimento...${NC}"
    check_env
    docker-compose -f docker-compose.dev.yml up -d mariadb
    echo -e "${GREEN}✅ MariaDB iniciado!${NC}"
    echo -e "${BLUE}📊 Informações de conexão:${NC}"
    echo "   Host: localhost"
    echo "   Porta: 3306"
    echo "   Database: partyrank"
    echo "   Usuário: partyrank_user"
    echo "   Senha: partyrank123 (padrão)"
    echo ""
    echo -e "${YELLOW}💡 Para conectar: $0 connect${NC}"
}

# Função para parar o banco
stop_db() {
    echo -e "${YELLOW}🛑 Parando MariaDB...${NC}"
    docker-compose -f docker-compose.dev.yml stop mariadb
    echo -e "${GREEN}✅ MariaDB parado!${NC}"
}

# Função para reiniciar o banco
restart_db() {
    echo -e "${YELLOW}🔄 Reiniciando MariaDB...${NC}"
    docker-compose -f docker-compose.dev.yml restart mariadb
    echo -e "${GREEN}✅ MariaDB reiniciado!${NC}"
}

# Função para mostrar status
show_status() {
    echo -e "${BLUE}📊 Status do MariaDB:${NC}"
    docker-compose -f docker-compose.dev.yml ps mariadb
}

# Função para mostrar logs
show_logs() {
    echo -e "${BLUE}📋 Logs do MariaDB:${NC}"
    docker-compose -f docker-compose.dev.yml logs -f mariadb
}

# Função para conectar ao banco
connect_db() {
    echo -e "${BLUE}🔌 Conectando ao MariaDB...${NC}"
    echo -e "${YELLOW}💡 Se não tiver o mysql client instalado, use: docker exec -it partyrank-mariadb-dev mysql -u partyrank_user -p partyrank${NC}"
    
    # Tenta conectar com mysql client local primeiro
    if command -v mysql &> /dev/null; then
        mysql -h localhost -P 3306 -u partyrank_user -p partyrank
    else
        # Fallback para docker exec
        docker exec -it partyrank-mariadb-dev mysql -u partyrank_user -p partyrank
    fi
}

# Função para resetar o banco (CUIDADO!)
reset_db() {
    echo -e "${RED}⚠️  ATENÇÃO: Esta operação irá REMOVER todos os dados do banco!${NC}"
    read -p "Tem certeza? Digite 'SIM' para confirmar: " confirm
    
    if [ "$confirm" = "SIM" ]; then
        echo -e "${YELLOW}🗑️  Removendo volumes e reiniciando...${NC}"
        docker-compose -f docker-compose.dev.yml down -v
        docker-compose -f docker-compose.dev.yml up -d mariadb
        echo -e "${GREEN}✅ Banco resetado!${NC}"
    else
        echo -e "${YELLOW}❌ Operação cancelada.${NC}"
    fi
}

# Main script
case "${1:-help}" in
    start)
        start_db
        ;;
    stop)
        stop_db
        ;;
    restart)
        restart_db
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    connect)
        connect_db
        ;;
    reset)
        reset_db
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Comando inválido: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac
