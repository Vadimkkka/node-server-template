import items from './items.js'

function parseItem({ name, type, price }) {
  if (name && type && price) {
    return { name, type, price }
  }
  return false
}

function getItem(req, res) {
  if (req.params.id === undefined) {
    res.status(200).json(items)
  } else {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(403).json({ error: 'Item id must be an integer' })
    } else if (items[id] === undefined) {
      res.status(404).json({ error: `Not found item by id - ${id}` })
    } else {
      res.status(200).json(items[id])
    }
  }
  /*  
    #swagger.tags = ['Item']
    #swagger.summary = 'Get items or item by id'
    #swagger.parameters['id'] = { 
      required: false,
      description: 'Item ID',
    } 
    #swagger.responses[200] = {
      description: 'Responce item or array of items',
      schema: { $ref: "#/definitions/Item" }
    }
    #swagger.responses[403] = {
      description: 'Error: Forbidden',
      schema: { $ref: "#/definitions/Item403" }
    }
    #swagger.responses[404] = {
      description: 'Error: Not Found',
      schema: { $ref: "#/definitions/Item404" }
    }
  */
}

function createItem(req, res) {
  const item = parseItem(req.body)
  if (item) {
    items.push(item)
    res.status(201).json({ id: items.length - 1 })
  } else {
    res.status(400).json({ error: 'Wrong item parameters' })
  }
  /*  
    #swagger.tags = ['Item']
    #swagger.summary = 'Create item'
    #swagger.parameters['item'] = { 
      in: 'body',
      type: 'object',
      description: 'Item object',
      schema: { $ref: "#/definitions/Item" }
    } 
    #swagger.responses[201] = {
      description: 'Created',
      schema: { id: 333 }
    }
    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: { $ref: "#/definitions/Item400" }
    }
  */
}

function updateItem(req, res) {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.status(403).json({ error: 'Item id must be an integer' })
  } else if (items[id] === undefined) {
    res.status(404).json({ error: `Not found item by id - ${id}` })
  } else {
    const item = parseItem(req.body)
    if (item) {
      items.splice(id, 1, item)
      res.sendStatus(200)
    } else {
      res.status(400).json({ error: 'Wrong item parameters' })
    }
  }
  /*  
    #swagger.tags = ['Item']
    #swagger.summary = 'Update item by id'
    #swagger.parameters['id'] = { 
      description: 'Item ID',
    } 
    #swagger.parameters['item'] = { 
      in: 'body',
      type: 'object',
      description: 'New item data',
      schema: { $ref: "#/definitions/Item" }
    } 
    #swagger.responses[200] = {
      description: 'OK'
    }
    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: { $ref: "#/definitions/Item400" }
    }
    #swagger.responses[403] = {
      description: 'Error: Forbidden',
      schema: { $ref: "#/definitions/Item403" }
    }
    #swagger.responses[404] = {
      description: 'Error: Not Found',
      schema: { $ref: "#/definitions/Item404" }
    }
  */
}

function deleteItem(req, res) {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    res.status(403).json({ error: 'Item id must be an integer' })
  } else if (items[id] === undefined) {
    res.status(404).json({ error: `Not found item by id - ${id}` })
  } else {
    const [item] = items.splice(id, 1)
    res.status(200).json(item)
  }
  /*  
    #swagger.tags = ['Item']
    #swagger.summary = 'Delete item by id'
    #swagger.parameters['id'] = { 
      description: 'Item ID',
    } 
    #swagger.responses[403] = {
      description: 'Error: Forbidden',
      schema: { $ref: "#/definitions/Item403" }
    }
    #swagger.responses[404] = {
      description: 'Error: Not Found',
      schema: { $ref: "#/definitions/Item404" }
    }
  */
}

export { getItem, createItem, updateItem, deleteItem }
