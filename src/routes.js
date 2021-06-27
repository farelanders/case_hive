import { Router } from 'express'

import UserController from './app/controllers/UserController'
const routes = new Router()

routes.get('/', (req, res) => { res.send('This is a test API, to test it acces https://github.com/farelanders/case_hive') })
routes.post('/v1/users/', UserController.store)
routes.get('/v1/findbyname/:key/', UserController.findByName)
routes.get('/v1/findbynickname/:key', UserController.findByNickname)
routes.put('/v1/alterlastnameadress/:id', UserController.alterLastNameAddress)
routes.put('/v1/alternickname/:id', UserController.alterNickname)
routes.delete('/v1/users/:id', UserController.delete)

export default routes
