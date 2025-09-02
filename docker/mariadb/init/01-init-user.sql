-- Verificar usuários existentes
SELECT User, Host FROM mysql.user WHERE User = 'partyrank_user';

-- Se o usuário não existir ou estiver com problemas, vamos recriar
DROP USER IF EXISTS 'partyrank_user'@'%';
DROP USER IF EXISTS 'partyrank_user'@'localhost';

-- Criar o usuário novamente
CREATE USER 'partyrank_user'@'%' IDENTIFIED BY 'partyrank123';
CREATE USER 'partyrank_user'@'localhost' IDENTIFIED BY 'partyrank123';

-- Dar permissões ao usuário
GRANT ALL PRIVILEGES ON partyrank.* TO 'partyrank_user'@'%';
GRANT ALL PRIVILEGES ON partyrank.* TO 'partyrank_user'@'localhost';

-- Aplicar as mudanças
FLUSH PRIVILEGES;

-- Verificar se funcionou
SELECT User, Host FROM mysql.user WHERE User = 'partyrank_user';