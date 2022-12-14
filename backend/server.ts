const jsonServer = require('json-server')

import * as fs from 'fs'
import * as http from 'http'

import { handleAuthentication } from './auth'
import { handleAuthorization } from './authz'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// 
server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)

// Use default router
server.use(router)

const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem')
}

http.createServer(server).listen(3001, () => {
  console.log('JSON Server is running')
})