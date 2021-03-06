const http = require('http')

const config = require('./config')
const logger = require('./misc/logger')
const router = require('./router')
const HttpRequest = require('./http/HttpRequest')
const HttpResponse = require('./http/HttpResponse')
const util = require('./misc/util')

const server = http.createServer(async (req, res) => {
  const response = new HttpResponse(req, res)
  try {
    const body = await util.receivePostData(req)
    const request = new HttpRequest(req, body)
    await router.route(request, response)
  } catch (e) {
    logger.error(e)
    await response.serverError(e)
  } finally {
    response.flush()
  }
})

server.on('error', e => {
  logger.error(e)
})

server.on('close', () => {
  logger.info('Server closed')
})

module.exports = {
  start() {
    const port = config.port
    let host = config.host
    server.listen(port, host)
    if (host === '0.0.0.0') {
      host = '127.0.0.1'
    }
    logger.info(`${config.name} running on http://${host}:${port}`)
  }
}
