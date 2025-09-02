
# Configuração Docker para PartyRank - Produção

Este documento explica como usar a configuração Docker completa para executar o PartyRank em produção com 3 containers: aplicação Next.js, MariaDB e Nginx como reverse proxy.

## Arquitetura

A aplicação é composta por 3 containers:

1. **app** - Aplicação Next.js (porta interna 3000)
2. **mariadb** - Banco de dados MariaDB (porta interna 3306)
3. **nginx** - Reverse proxy com SSL (portas 80 e 443)

## Estrutura dos Arquivos

- `docker-compose.yaml` - Configuração principal do Docker Compose
- `Dockerfile` - Imagem Docker para a aplicação Next.js
- `docker/nginx/nginx.conf` - Configuração principal do Nginx
- `docker/nginx/conf.d/party-rank.win.conf` - Configuração do servidor
- `docker/nginx/ssl/` - Certificados SSL
- `docker/deploy.sh` - Script de deploy automatizado
- `src/app/api/health/route.ts` - Endpoint de health check

## Configuração dos Containers

### Aplicação Next.js
- **Imagem**: Build customizada
- **Porta interna**: 3000
- **Health check**: `/api/health`
- **Volumes**: Uploads de imagens persistentes

### MariaDB
- **Imagem**: MariaDB 10.11
- **Porta interna**: 3306
- **Banco de dados**: partyrank
- **Usuário**: partyrank_user
- **Health check**: MySQL ping

## Deploy em Produção

### 1. Configuração Inicial

1. **Configure o DNS**: Aponte `party-rank.win` e `www.party-rank.win` para o IP do seu servidor

2. **Configure as variáveis de ambiente**:
```bash
cp env.example .env
nano .env
```

Configure as seguintes variáveis no `.env`:
```env
DATABASE_URL=mysql://partyrank_user:partyrank_password@mariadb:3306/partyrank
MYSQL_ROOT_PASSWORD=your_strong_root_password_here
MYSQL_PASSWORD=your_strong_password_here
NEXTAUTH_URL=https://party-rank.win
NEXTAUTH_SECRET=your_very_strong_secret_key_here_minimum_32_characters
NODE_ENV=production
```

### 2. Deploy Automatizado

Execute o script de deploy:
```bash
chmod +x docker/deploy.sh
./docker/deploy.sh
```

Este script irá:
- Parar containers existentes
- Gerar certificados SSL auto-assinados
- Fazer build da aplicação
- Iniciar todos os containers
- Executar migrações do banco de dados

### 3. Deploy Manual

```bash
# Build da aplicação
docker-compose build

# Iniciar containers
docker-compose up -d

# Executar migrações
docker-compose exec app npx prisma migrate deploy
```

### 4. Configurar SSL com Let's Encrypt (Recomendado)

Após configurar o DNS, execute:
```bash
chmod +x docker/nginx/ssl/letsencrypt.sh
./docker/nginx/ssl/letsencrypt.sh
```

### 5. Verificar Deploy

```bash
# Verificar status dos containers
docker-compose ps

# Ver logs
docker-compose logs -f

# Testar health check
curl https://party-rank.win/health
```

## Comandos Úteis

### Gerenciamento do Container

```bash
# Parar os containers
docker-compose down

# Parar e remover volumes (CUIDADO: apaga os dados)
docker-compose down -v

# Rebuild dos containers
docker-compose up --build

# Ver logs em tempo real
docker-compose logs -f mariadb
```

### Acesso ao Banco de Dados

```bash
# Conectar ao MariaDB via linha de comando
docker-compose exec mariadb mysql -u partyrank_user -p partyrank

# Conectar como root
docker-compose exec mariadb mysql -u root -p
```

### Backup e Restore

```bash
# Backup do banco de dados
docker-compose exec mariadb mysqldump -u partyrank_user -p partyrank > backup.sql

# Restore do banco de dados
docker-compose exec -T mariadb mysql -u partyrank_user -p partyrank < backup.sql
```

## Volumes e Dados Persistentes

Os dados do MariaDB são armazenados no volume `mariadb_data`, garantindo que os dados persistem mesmo quando o container é removido.

## Rede

Os containers estão conectados através da rede `partyrank-network`, permitindo comunicação entre os serviços.

## Troubleshooting

### Porta 3306 já está em uso

Se a porta 3306 já estiver sendo usada, altere a porta no `docker-compose.yaml`:

```yaml
ports:
  - "3307:3306"  # Use porta 3307 no host
```

E atualize a `DATABASE_URL` no `.env`:

```env
DATABASE_URL=mysql://partyrank_user:partyrank_password@localhost:3307/partyrank
```

### Problemas de Permissão

Se houver problemas de permissão com os volumes, execute:

```bash
sudo chown -R $USER:$USER ./docker
```

### Reset Completo

Para resetar completamente o ambiente:

```bash
docker-compose down -v
docker system prune -f
docker-compose up mariadb -d
```
