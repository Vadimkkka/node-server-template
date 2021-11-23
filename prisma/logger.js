import chalk from 'chalk'

async function consoleLogger(params, next) {
  const before = Date.now()
  const result = await next(params)
  const after = Date.now()
  console.log(chalk`{bold.red db}: {yellow ${params.model}}.{green ${params.action}} took {italic ${after - before}ms}`, params.args || '')
  return result
}

export default consoleLogger
