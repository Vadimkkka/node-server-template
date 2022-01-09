import chalk from 'chalk'

const methods = {
  'GET': chalk.blue,
  'PUT': chalk.hex('#FBA12F'),
  'DELETE': chalk.red,
  'POST': chalk.green
}

function parseMethod(method) {
  return methods[method](method.padEnd(6, ' '))
}

function parseUrl(url) {
  return chalk.bold(url)
}

function parseStatus(status) {
  let result = chalk.red;
  if (status < 300) {
    result = chalk.green
  } else if (status < 400) {
    result = chalk.hex('#FBA12F')
  }
  return result.bold(status)
}

function parseTime(time) {
  return chalk.italic(time.padEnd(9, ' '))
}

function parseDate(date) {
  return chalk.underline(date.slice(0, -6))
}

export default {
  url: parseUrl,
  date: parseDate,
  time: parseTime,
  status: parseStatus,
  method: parseMethod,
}
