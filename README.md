# Tic Tac Toe Server
Aplicação de servidor para Login de usuário e convites de partidas para o projeto: [Tic Tac Toe Web](https://github.com/fernandovmp/tic-tac-toe-web).

# Conteúdo
- [Motivação](#motivação)
- [Instalação](#instalação)
- [Desenvolvimento](#desenvolvimento)
- [Rotas](#rotas)

# Motivação
Este projeto é parte do [Tic Tac Toe Web](https://github.com/fernandovmp/tic-tac-toe-web) e de meu portfólio pessoal. Serei grato a qualquer feedback que queira dar.

# Instalação
1. Baixe e instale o Node: https://nodejs.org
2. Clone esse repositório: \
`git clonehttps://github.com/fernandovmp/tic-tac-toe-server.git`
3. Instale o yarn: https://yarnpkg.com/lang/pt-br/docs/install/
4. Instale as dependências do projeto: `yarn install`
5. Crie uma conta no MongoDB: 
6. Crie um cluster no MongoDB Atlas (ou outro de sua preferência): https://www.mongodb.com/cloud/atlas
7. Preencha as [varáveis de ambiente](#variáveis-de-ambiente)
8. Inicie o ambiente de desenvolvimento: `yarn start`

# Desenvolvimento
## Variáveis de ambiente
Copie as informações do arquivo [.env.exemple](.env.exemple) para um arquivo `.env` \
O arquivo precisa conter as seguintes informações:
 - `PORT` porta que o servidor irá rodar
 - `SECRET` segredo do json web token
 - `CONNECTION_STRING` string de conexão ao banco de dados. \

Exemplo:
```
PORT=3001

SECRET=mySecret

CONNECTION_STRING=myConnectionString
```

# Rotas

- [Cadastrar usuário](#cadastrar-usuário)
- [LogIn](#login)
- [Informações do usuário logado](#informações-do-usuário-logado)
- [Listar usuários](#listar-usuários)
- [Listar usuário por id](#listar-usuário-por-id)
- [Atualizar informação de usuário](#atualizar-informação-de-usuário)
- [Listar convites](#listar-convites)
- [Enviar convite](#enviar-convite)

## Cadastrar usuário
- **URL** \
` /users `
- **Método** \
`POST`
- **Dados da requisição**
```json
{
    "username": "Usuário",
    "password": "senha"
}
```
- **Resposta em caso de sucesso** 
  - **Código:** 201 \
  **Conteúdo:** 
    ```json
    {
    "invites": [],
    "_id": "5d5c349f97243f2e044d21f0",
    "username": "Usuário",
    "createdAt": "2019-08-20T17:57:51.017Z",
    "updatedAt": "2019-08-20T17:57:51.017Z",
    "__v": 0
    }
    ```
- **Resposta de erro**
  - **Código:** 200 \
  **Conteúdo:** `{ "userAlreadyExists": true }`

## LogIn
- **URL** \
` /login `
- **Método** \
`POST`
- **Dados da requisição** \
```json
{
    "username": "Usuário",
    "password": "senha"
}
```
- **Resposta em caso de sucesso** 
  - **Código:** 200 \
  **Conteúdo:** Nenhum. \
  Devolve um cookie que armazena um web token para autorização em outras rotas.
- **Resposta de erro**
  - **Código:** 401 \
  **Conteúdo:** Nenhum.

## Informações do usuário logado
- **URL** \
` /login/user `
- **Método** \
`GET`
- **Dados da requisição** \
Nenhum. \
Usa um web token para verificar autorização. [Rota para receber token](#login).
- **Resposta em caso de sucesso** 
  - **Código:** 200 \
  **Conteúdo:** 
  ```
  {
    "_id": "5d606bc1b3329f40508662ae",
    "username": "userB",
    "createdAt": "2019-08-23T22:42:09.310Z",
    "updatedAt": "2019-08-25T20:38:44.548Z",
    "__v": 6,
    "lostMatches": 9,
    "tiedMatches": 1,
    "wonMatches": 5
  }
  ```
- **Resposta de erro**
  - **Código:** 401 \
  **Conteúdo:** Nenhum.


## Listar usuários
- **URL** \
` /users `
- **Método** \
`GET`
- **Dados da requisição** \
Nenhum. \
Usa um web token para verificar autorização. [Rota para receber token](#login).
- **Resposta em caso de sucesso** 
  - **Código:** 200 \
  **Conteúdo:** 
    ```json
    [
        {
            "invites": [],
            "_id": "5d5c349f97243f2e044d21f0",
            "username": "Usuário",
            "createdAt": "2019-08-20T17:57:51.017Z",
            "updatedAt": "2019-08-20T17:57:51.017Z",
            "__v": 0
        },
        {
            "invites": [],
            "_id": "5d587c6d038d4541a0917df7",
            "username": "userA",
            "createdAt": "2019-08-20T17:57:51.017Z",
            "updatedAt": "2019-08-20T17:57:51.017Z",
            "__v": 0
        },
        {
            "invites": [],
            "_id": "5d598d756ddc8b2450c9c941",
            "username": "userB",
            "createdAt": "2019-08-20T17:57:51.017Z",
            "updatedAt": "2019-08-20T17:57:51.017Z",
            "__v": 0
        }
    ]
    ```
- **Resposta de erro**
  - **Código:** 401 \
  **Conteúdo:** `{ "auth": false }`
  
## Listar usuário por Id
- **URL** \
` /users/:id `
- **Parâmetros da url** \
`id=[String]`
- **Método** \
`GET`
- **Dados da requisição** \
Nenhum. \
Usa um web token para verificar autorização. [Rota para receber token](#login).
- **Resposta em caso de sucesso** 
  - **Código:** 200 \
  **Conteúdo:** 
    ```json
    {
        "invites": [],
        "_id": "5d5c349f97243f2e044d21f0",
        "username": "Usuário",
        "createdAt": "2019-08-20T17:57:51.017Z",
        "updatedAt": "2019-08-20T17:57:51.017Z",
        "__v": 0
    }
    ```
- **Resposta de erro**
  - **Código:** 401 \
  **Conteúdo:** `{ "auth": false }`
  
  - **Código:** 204 \
  **Conteúdo:** Nenhum.
  
## Atualizar informação de usuário
- **URL** \
` /users/:id `
- **Parâmetros da url** \
`id=[String]`
- **Método** \
`PATCH`
- **Dados da requisição** \
[Opcional]
```json
{
    "lostMatches": 0,
    "tiedMatches": 0,
    "wonMatches": 0
}
```
Usa um web token para verificar autorização. [Rota para receber token](#login).
- **Resposta em caso de sucesso** 
  - **Código:** 200 \
  **Conteúdo:**  Nenhum.
- **Resposta de erro**
  - **Código:** 401 \
  **Conteúdo:** `{ "auth": false }`
  
  - **Código:** 204 \
  **Conteúdo:** Nenhum.
  
## Listar convites
- **URL** \
` /invites`
- **Método** \
`GET`
- **Dados da requisição** \
Nenhum. \
Usa um web token para verificar autorização e id do usuário que terá convites lidos. [Rota para receber token](#login).
- **Resposta em caso de sucesso** 
  - **Código:** 200 \
  **Conteúdo:**  
  ```json
  [
    {
        "_id": "5d5b1a3d0dfdd535fcb6d1c8",
        "sender": {
            "_id": "5d59b95b9b2f6f3b1c26e4b7",
            "username": "userC",
            "createdAt": "2019-08-18T20:47:23.013Z",
            "updatedAt": "2019-08-19T21:31:24.675Z",
            "__v": 1
        },
        "receptor": {
            "_id": "5d598d7b6ddc8b2450c9c942",
            "username": "userD",
            "createdAt": "2019-08-18T17:40:11.110Z",
            "updatedAt": "2019-08-19T21:53:03.997Z",
            "__v": 4
            },
            "createdAt": "2019-08-19T21:53:01.110Z",
            "updatedAt": "2019-08-19T21:53:01.110Z",
        "__v": 0
    },
    {
        "_id": "5d5b1a3e0dfdd535fcb6d1c9",
        "sender": {
            "_id": "5d59b95b9b2f6f3b1c26e4b7",
            "username": "userC",
            "createdAt": "2019-08-18T20:47:23.013Z",
            "updatedAt": "2019-08-19T21:31:24.675Z",
            "__v": 1
        },
        "receptor": {
            "_id": "5d598d7b6ddc8b2450c9c942",
            "username": "userD",
            "createdAt": "2019-08-18T17:40:11.110Z",
            "updatedAt": "2019-08-19T21:53:03.997Z",
            "__v": 4
        },
        "createdAt": "2019-08-19T21:53:02.214Z",
        "updatedAt": "2019-08-19T21:53:02.214Z",
        "__v": 0
    }
  ]
  ```
- **Resposta de erro**
  - **Código:** 401 \
  **Conteúdo:** `{ "auth": false }`

## Enviar convite
- **URL** \
` /users/:id/invites`
- **Parâmetros da url** \
`id=[String]`
- **Método** \
`POST`
- **Dados da requisição** \
Nenhum. \
Usa um web token para verificar autorização e id do usuário que terá convites lidos. [Rota para receber token](#login).
- **Resposta em caso de sucesso** 
  - **Código:** 201 \
  **Conteúdo:**  
  ```json
  {
    "_id": "5d5c438197243f2e044d21f1",
    "sender": "5d5c349f97243f2e044d21f0",
    "receptor": "5d587c6d038d4541a0917df7",
    "createdAt": "2019-08-20T19:01:21.162Z",
    "updatedAt": "2019-08-20T19:01:21.162Z",
    "__v": 0
  }
  ```
- **Resposta de erro**
  - **Código:** 401 \
  **Conteúdo:** `{ "auth": false }`
