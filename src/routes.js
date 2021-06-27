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

routes.get('/', (req, res) => { res.send('This is a case API, to test it acces https://github.com/farelanders/case_hive') })

routes.post('/v1/users/', UserController.store)
/**
*  @swagger
* /v1/users:
*  post:
*    description: Cria um usuário no banco de dados
*    consumes:
*    - application/json
*    produces:
*    - application/json
*    parameters:
*    - in: body
*      name: usuario
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
*     summary: Retrieve a single JSONPlaceholder user.
*     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
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
*     summary: Retrieve a single JSONPlaceholder user.
*     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
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
*            description: Nenhum usuário encontrado com esse nickname
*        500:
*            description: Erro inesperado no servidor, tente novamente
*/
routes.put('/v1/users/alterlastnameadress/:id', UserController.alterLastNameAddress)
/**
*  @swagger
* /v1/users/alterlastnameadress/{id}:
*  put:
*    description: Cria um usuário no banco de dados
*    consumes:
*    - application/json
*    produces:
*    - application/json
*    parameters:
*    - in: body
*      name: usuario
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
*            description: Usuário registrado com sucesso
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
*    description: Cria um usuário no banco de dados
*    consumes:
*    - application/json
*    produces:
*    - application/json
*    parameters:
*    - in: body
*      name: usuario
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
*     summary: Retrieve a single JSONPlaceholder user.
*     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Nome e/ou sobrenome
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
