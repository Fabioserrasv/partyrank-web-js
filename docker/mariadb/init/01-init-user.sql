-- Script de inicialização do usuário partyrank_user
-- Este script garante que o usuário seja criado corretamente com todas as permissões

-- Remover usuário se já existir (para evitar conflitos)
DROP USER IF EXISTS 'partyrank_user'@'%';
DROP USER IF EXISTS 'partyrank_user'@'localhost';

-- Criar o usuário partyrank_user com a senha definida na variável MYSQL_PASSWORD
CREATE USER 'partyrank_user'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';
CREATE USER 'partyrank_user'@'localhost' IDENTIFIED BY '${MYSQL_PASSWORD}';

-- Garantir que o banco partyrank existe
CREATE DATABASE IF NOT EXISTS partyrank CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Dar todas as permissões no banco partyrank para o usuário
GRANT ALL PRIVILEGES ON partyrank.* TO 'partyrank_user'@'%';
GRANT ALL PRIVILEGES ON partyrank.* TO 'partyrank_user'@'localhost';

-- Aplicar as mudanças
FLUSH PRIVILEGES;

-- Verificar se o usuário foi criado corretamente
SELECT 'Usuário partyrank_user criado com sucesso!' as status;
SELECT User, Host FROM mysql.user WHERE User = 'partyrank_user';
