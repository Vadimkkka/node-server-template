import supertest from 'supertest'
import server from '../app.js'

global.server = supertest(server)
afterAll(() => server.close())