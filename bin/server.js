const semver = require('semver')
const version = process.version.replace('v', '')
if (!semver.gte(version, '8.10.0')) {
  console.error('node >= 8.10.0 required, please upgrade nodejs, or use `let g:coc_node_path = "/path/to/node"` in your vimrc')
  process.exit(1)
}
Object.defineProperty(console, 'log', {
  value: () => { }
})
const attach = require('../lib/attach').default
const logger = require('../lib/util/logger')('server')

attach({ reader: process.stdin, writer: process.stdout })

process.on('uncaughtException', function (err) {
  let msg = 'Uncaught exception: ' + err.stack
  console.error(msg)
  logger.error('uncaughtException', err.stack)
})

process.on('unhandledRejection', function (reason, p) {
  if (reason instanceof Error) {
    console.error('UnhandledRejection: ' + reason.message + '\n' + reason.stack)
  } else {
    console.error('UnhandledRejection: ' + reason)
  }
  logger.error('unhandledRejection ', p, reason)
})
