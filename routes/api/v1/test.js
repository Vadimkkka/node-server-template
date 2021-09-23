import express from 'express'
import { getItem, createItem, updateItem, deleteItem } from '../../../controllers/api/v1/test.js'

const router = express.Router()

router
  .get('/item', getItem)
  .get('/item/:id', getItem)
  .post('/item', createItem)
  .put('/item/:id', updateItem)
  .delete('/item/:id', deleteItem)

export default router
