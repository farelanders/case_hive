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
      servers: ['http://localhost:3000']
    }
  },
  apis: ['./src/routes.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

routes.get('/', (req, res) => { res.send('This is a case API, to test it acces https://github.com/farelanders/case_hive') })

routes.post('/v1/users/', UserController.store)
routes.get('/v1/users/findbyname/:key/', UserController.findByName)
routes.get('/v1/users/findbynickname/:key', UserController.findByNickname)
routes.put('/v1/users/alterlastnameadress/:id', UserController.alterLastNameAddress)
routes.put('/v1/users/alternickname/:id', UserController.alterNickname)
routes.delete('/v1/users/:id', UserController.delete)

export default routes
