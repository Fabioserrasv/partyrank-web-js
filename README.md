# Party Rank Web

[![My Skills](https://skillicons.dev/icons?i=ts,nextjs,prisma,mysql,react,sass&theme=light)](https://skillicons.dev)

_Status: Under Development_
_Status: Em Desenvolvimento_

## Table of Contents
<small>_PT-BR: Índice_</small>

- [About](#about)
- [How to use](##how-to-use)
  - [Set up environment variables](#set-up-environment-variables)
- [Contribute](#how-to-contribute)
- [License](#license)
- [Contact](#contact)

# About

<small>_PT-BR:Sobre_</small>

The Party Rank Web is a web development project created for ranking anime songs with friends, such as Openings, Endings, Insert Songs, you decide. The system works in partnership with the 'Party Rank Video Generator' software to automatically generate the edited video.


<small>PT-BR:</small>

O Party Rank Web é um projeto de desenvolvimento web criado para o ranqueamento de músicas de animes, como Openings, Endings, Insert Songs, você decide. O sistema trabalha em parceria com o software 'Party Rank Video Generator' para gerar o vídeo editado automaticamente.

## How to Use
<small>_PT-BR: Como Usar_</small> [To do]

TO DO. If you still want to use it in your own you can follow the steps below on "How to Contribute" to execute the project on your localhost.

<small>PT-BR:</small>

À Fazer. Se você mesmo assim quer usar a aplicação por si só você pode seguir os passos abaixo para executar a aplicação no seu localhost.

## How to Contribute
<small>_PT-BR: Como Contruibuir_</small>

This project is Open Source, everyone can contribute to it. You are all free to fork and contribute.

[Contact](#contact) me for more information. 

<small>PT-BR:</small>

Este projeto é Open Source, todos podem contribuir nele. Você está livre para criar seu forl da aplicação e contruibuit do jeito que quiser.

Me [contate](#contact) para mais informações. 


### Set up environment variables
<small>_PT-BR: Configurando as variáveis de ambiente_</small>

Create your .env file and follow the structure.

<small>PT-BR:</small>

Crie seu arquivo .env e siga a estrutura


```bash
#./.env
DATABASE_URL="mysql://user:password@localhost:3306/MY_DATABASE" #Database URL connection
NEXTAUTH_URL="http://localhost:3000/api/auth" #https://next-auth.js.org/configuration/options
NEXTAUTH_SECRET="" #https://next-auth.js.org/configuration/options

# SONGFINDER API URLS
ANIMETHEMES_API_URL="https://beta.animethemes.moe/api/animetheme"
```



### Run the development server
<small>_PT-BR: Iniciando o servidor de desenvolvimento_</small>

Run your mysql server or run docker compose on docker and initialize the project. 

<small>PT-BR:</small>

Execute seu server mysql ou inicie o docker compose para inicializar o projeto.

```bash
#Initialize and create database
npx migrate prisma dev

#Create default user admin
npx prisma db seed # username: admin | password: admin

npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Default user:
*Username*: admin
*Password*: admin

<small>PT-BR:</small>

Abra [http://localhost:3000](http://localhost:3000) no seu navegador e veja o resultado.

Usuário padrão:
*Usuário*: admin
*Senha*: admin

# Contact

<small>_PT-BR: Contato_</small>

Discord: serrra

## License
<small>_PT-BR: Licença_</small>

MIT License

Copyright (c) 2023 Fábio Serra Vasconcelos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.