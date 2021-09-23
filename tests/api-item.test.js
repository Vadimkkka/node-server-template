const { server } = global
const baseUrl = '/api/v1/test/item'

describe('GET', () => {
  let items = []
  it(baseUrl, async () => {
    const res = await server.get(baseUrl).expect(200)
    expect(Array.isArray(res.body)).toBeTruthy()
    expect(res.body.length).toBe(2)
    items = res.body
  })

  it(`${baseUrl}/:id`, async () => {
    const res = await server.get(`${baseUrl}/0`).expect(200)
    expect(res.body).toEqual(items[0])
  })

  it(`${baseUrl}/wtf`, async () => {
    const res = await server.get(`${baseUrl}/wtf`).expect(403)
    expect(res.body).toHaveProperty('error')
  })

  it(`${baseUrl}/999`, async () => {
    const res = await server.get(`${baseUrl}/999`).expect(404)
    expect(res.body).toHaveProperty('error')
  })
})

describe('CREATE', () => {
  const newItem = { name: 'create', type: 'create type', price: 777 }

  it(baseUrl, async () => {
    const resCreate = await server.post(baseUrl).send(newItem).expect(201)
    expect(resCreate.body).toHaveProperty('id')

    const resGet = await server.get(`${baseUrl}/${resCreate.body.id}`).expect(200)
    expect(resGet.body).toEqual(newItem)
  })

  it(`${baseUrl} - wrong params`, async () => {
    delete newItem.name
    const resCreate = await server.post(baseUrl).send(newItem).expect(400)
    expect(resCreate.body).toHaveProperty('error')
  })

  it(`${baseUrl} - empty body`, async () => {
    const resCreate = await server.post(baseUrl).send().expect(400)
    expect(resCreate.body).toHaveProperty('error')
  })
})

describe('UPDATE', () => {
  const newItem = { name: 'update', type: 'update type', price: 777 }

  it(`${baseUrl}/0`, async () => {
    await server.put(`${baseUrl}/0`).send(newItem).expect(200)
    const resGet = await server.get(`${baseUrl}/0`).expect(200)
    expect(resGet.body).toEqual(newItem)
  })

  it(`${baseUrl}/wtf`, async () => {
    const resUpdate = await server.put(`${baseUrl}/wft`).send(newItem).expect(403)
    expect(resUpdate.body).toHaveProperty('error')
  })

  it(`${baseUrl}/999`, async () => {
    const resUpdate = await server.put(`${baseUrl}/999`).send(newItem).expect(404)
    expect(resUpdate.body).toHaveProperty('error')
  })

  it(`${baseUrl}/0 - wrong params`, async () => {
    delete newItem.name
    const resUpdate = await server.put(`${baseUrl}/0`).send(newItem).expect(400)
    expect(resUpdate.body).toHaveProperty('error')
  })

  it(`${baseUrl}/0 - empty body`, async () => {
    const resUpdate = await server.put(`${baseUrl}/0`).send().expect(400)
    expect(resUpdate.body).toHaveProperty('error')
  })
})

describe('DELETE', () => {
  it(`${baseUrl}/:id`, async () => {
    const { body: item } = await server.get(`${baseUrl}/0`).expect(200)

    const resDelete = await server.delete(`${baseUrl}/0`).expect(200)
    expect(resDelete.body).toEqual(item)
  })

  it(`${baseUrl}/wtf`, async () => {
    const resDelete = await server.delete(`${baseUrl}/wtf`).expect(403)
    expect(resDelete.body).toHaveProperty('error')
  })

  it(`${baseUrl}/999`, async () => {
    const resDelete = await server.delete(`${baseUrl}/999`).expect(404)
    expect(resDelete.body).toHaveProperty('error')
  })
})