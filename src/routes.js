import { Router } from 'express'

import UserController from './app/controllers/UserController'
const routes = new Router()
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Case Hive API',
      description: 'API para case de crud da empresa Hive',
      contact: {
        name: 'Marcos Antonio Travagin'
      },
      servers: ['http://rest-api-hive.herokuapp.com/']
    }
  },
  apis: ['./src/routes.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
routes.get('/', (req, res) => { res.send('This is a case API, to test it visit https://github.com/farelanders/case_hive') })

routes.post('/v1/users/', UserController.store)
/**
*  @swagger
* /v1/users:
*  post:
*    summary: Criação de usuário.
*    description: Cria um usuário no banco de dados e retorna os dados.
*    consumes:
*    - application/json
*    produces:
*    - application/json
*    parameters:
*    - in: body
*      name: Dados
*      schema:
*        $ref: '#/definitions/usuario'
*    responses:
*        200:
*            description: Usuário registrado com sucesso
*        400:
*            description: Erro na validação de dados
*        500:
*            description: Erro inesperado no servidor, tente novamente
* definitions:
*    usuario:
*        type: object
*        required:
*        - name
*        - lastname
*        - nickname
*        - address
*        - bio
*        properties:
*            name:
*                type: string
*                example: Usuario
*            lastname:
*                type: string
*                example: Teste
*            nickname:
*                type: string
*                example: Teste
*            address:
*                type: string
*                example: Rua teste
*            bio:
*                type: string
*                example: teste
*
*
*/
routes.get('/v1/users/findbyname/:key/', UserController.findByName)
/**
* @swagger
* /v1/users/findbyname/{key}:
*   get:
*     summary: Procura um usuário por nome e/ou sobrenome.
*     description: Filtra todos os usuários cadastrador pelos campos nome e/ou sobrenome e retorna um array de usuários.
*     parameters:
*       - in: path
*         name: key
*         required: true
*         description: Nome e/ou sobrenome
*         schema:
*           type: string
*     responses:
*        200:
*            description: Retorna os dados encontrados
*        404:
*            description: Nenhum usuário encontrado com esse nome e/ou sobrenome
*        500:
*            description: Erro inesperado no servidor, tente novamente
*/
routes.get('/v1/users/findbynickname/:key', UserController.findByNickname)
/**
* @swagger
* /v1/users/findbynickname/{key}:
*   get:
*     summary: Procura um usuário por nickname
*     description: Filtra todos os usuários cadastrador pelo campo nickname e retorna um único usuário com nome, sobrenome e nickname.
*     parameters:
*       - in: path
*         name: key
*         required: true
*         description: nickname
*         schema:
*           type: string
*     responses:
*        200:
*            description: Retorna os dados encontrados
*        404:
*            description: Nenhum usuário encontrado com esse nickname
*        500:
*            description: Erro inesperado no servidor, tente novamente
*/
routes.put('/v1/users/alterlastnameadress/:id', UserController.alterLastNameAddress)
/**
*  @swagger
* /v1/users/alterlastnameadress/{id}:
*  put:
*    summary: Altera sobrenome e endereço de um usuário.
*    description: Altera o sobrenome e o endereço de um usuário baseado no id recebido como parâmetro.
*    consumes:
*    - application/json
*    produces:
*    - application/json
*    parameters:
*    - in: body
*      name: Dados
*      schema:
*        $ref: '#/definitions/lastnameaddress'
*    - in: path
*      name: id
*      required: true
*      description: Id do usuário
*      schema:
*        type: string
*    responses:
*        200:
*            description: Dados alterados com sucesso
*        400:
*            description: Erro na validação de dados
*        500:
*            description: Erro inesperado no servidor, tente novamente
* definitions:
*    lastnameaddress:
*        type: object
*        required:
*        - lastname
*        - address
*        properties:
*            lastname:
*                type: string
*                example: Teste
*            address:
*                type: string
*                example: Rua teste
*
*
*/
routes.put('/v1/users/alternickname/:id', UserController.alterNickname)
/**
*  @swagger
* /v1/users/alternickname/{id}:
*  put:
*    summary: Altera o nickname de um usuário.
*    description: Altera o nickname de um usuário baseado no id recebido como parâmetro.
*    consumes:
*    - application/json
*    produces:
*    - application/json
*    parameters:
*    - in: body
*      name: Dados
*      schema:
*        $ref: '#/definitions/nickname'
*    - in: path
*      name: id
*      required: true
*      description: Id do usuário
*      schema:
*        type: string
*    responses:
*        200:
*            description: Usuário registrado com sucesso
*        400:
*            description: Erro na validação de dados
*        500:
*            description: Erro inesperado no servidor, tente novamente
* definitions:
*    nickname:
*        type: object
*        required:
*        - nickname
*        properties:
*            nickname:
*                type: string
*                example: Teste
*
*
*/
routes.delete('/v1/users/:id', UserController.delete)
/**
* @swagger
* /v1/users/{id}:
*   delete:
*     summary: Remove um usuário
*     description: Remove um usuário baseado no id recebido como parâmetro.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Id do usuário
*         schema:
*           type: string
*     responses:
*        200:
*            description: Usuário removido com sucesso
*        404:
*            description: Nenhum usuário encontrado com esse Id
*        500:
*            description: Erro inesperado no servidor, tente novamente
*/
export default routes
