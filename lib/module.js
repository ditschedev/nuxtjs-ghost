const { resolve } = require('path')

module.exports = function (_moduleOptions) {
  const moduleOptions = {
    ...this.options.ghost,
    ..._moduleOptions
  }

  const options = {
    version: 'v3',
    ...moduleOptions
  }

  if (!options.key) {
    options.key = process.env.GHOST_API_KEY
  }

  if (!options.url) {
    options.url = process.env.GHOST_API_URL
  }

  if (!options.key || !options.url) {
    throw new Error('[Ghost] Please provide your sites url and the api key.')
  }

  if (!/https?:\/\//.test(options.url)) {
    throw new Error('[Ghost] Your given url has no protocol.')
  }
  if (options.url.endsWith('/')) {
    throw new Error('[Ghost] Your given url has a trailing slash.')
  }
  if (!/[0-9a-f]{26}/.test(options.key)) {
    throw new Error('[Ghost] Invalid api key. Api keys have 26 hexadecimal characters.')
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'ghost.js',
    options
  })
}

module.exports.meta = require('../package.json')
