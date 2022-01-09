import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import parser from './parser.js'

const { MODE } = process.env

const options = {}
let logFunction = () => { };

const LogFile = 'test.log'

function logToConsole(tokens, req, res) {
  const method = tokens.method(req, res)
  const url = tokens.url(req, res)
  const status = tokens.status(req, res)
  const time = tokens['response-time'](req, res) + ' ms'
  const date = tokens.date(req, res, 'clf')

  return [
    parser.date(date),
    parser.status(status),
    parser.method(method),
    parser.time(time),
    parser.url(url),
  ].join(' | ')
}

function logToFile(tokens, req, res) {
  const method = tokens.method(req, res).padEnd(6, ' ')
  const url = tokens.url(req, res).padEnd(21, ' ')
  const status = tokens.status(req, res)
  const time = (tokens['response-time'](req, res) + ' ms').padEnd(9, ' ')
  const date = tokens.date(req, res, 'clf').slice(0, -6)
  const address = tokens['remote-addr'](req, res)
  const agent = tokens['user-agent'](req, res)

  return [
    date,
    status,
    method,
    time,
    url,
    address,
    agent
  ].join(' | ')
}

if (MODE === 'dev') {
  logFunction = logToConsole
} else if (MODE === 'prod') {
  logFunction = logToFile
  const __dirname = path.resolve()
  options.stream = fs.createWriteStream(path.join(__dirname, `./${LogFile}`), { flags: 'a' })
}

const logger = morgan(logFunction, options)


export default logger
