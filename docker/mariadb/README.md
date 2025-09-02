# Configuração do Banco de Dados MariaDB

## Problema Resolvido

O usuário `partyrank_user` não estava sendo criado corretamente durante a inicialização do container, causando erro de autenticação.

## Solução Implementada

### 1. Script de Inicialização
- Criado `docker/mariadb/init/01-init-user.sql`
- Este script é executado automaticamente quando o container é criado
- Garante que o usuário `partyrank_user` seja criado com as permissões corretas

### 2. Configurações Atualizadas
- `docker-compose.yaml`: DATABASE_URL agora usa `${MYSQL_PASSWORD}` em vez de senha hardcoded
- `env.example`: Atualizado com as senhas corretas

### 3. Como Usar

#### Para rebuild completo (apaga todos os dados):
```bash
./docker/rebuild-db.sh
```

#### Para rebuild manual:
```bash
# Parar o container
docker-compose stop mariadb

# Remover container e volume
docker-compose rm -f mariadb
docker volume rm partyrank-web-js_mariadb_data

# Rebuildar
docker-compose up -d mariadb
```

#### Para testar a conexão:
```bash
docker exec -it partyrank-mariadb mysql -u partyrank_user -p
# Senha: partyrank123
```

## Variáveis de Ambiente Necessárias

Certifique-se de ter um arquivo `.env` com:
```
MYSQL_ROOT_PASSWORD=root123@Root
MYSQL_PASSWORD=partyrank123
```

## Estrutura de Arquivos

```
docker/
├── mariadb/
│   ├── init/
│   │   └── 01-init-user.sql    # Script de inicialização
│   └── README.md               # Esta documentação
└── rebuild-db.sh               # Script de rebuild
```
