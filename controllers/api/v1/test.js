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
}

function createItem(req, res) {
  const item = parseItem(req.body)
  if (item) {
    items.push(item)
    res.status(201).json({ id: items.length - 1 })
  } else {
    res.status(400).json({ error: 'Wrong item parameters' })
  }
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
}

export { getItem, createItem, updateItem, deleteItem }