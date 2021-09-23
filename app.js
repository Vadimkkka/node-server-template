import 'dotenv/config'
import express from 'express'
import logger from './logs/logger.js'
import apiRoute from './routes/api/v1/index.js'

const { PORT, MODE } = process.env

const app = express()
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(logger)

app.use(express.static('./public'))
app.use('/api/v1', apiRoute)
/* istanbul ignore next */
const server = app.listen(PORT, () => {
  if (MODE !== 'test') {
    console.log(`App listening at http://localhost:${PORT}`)
  }
})

export default server