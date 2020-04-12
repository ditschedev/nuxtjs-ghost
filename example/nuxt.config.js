const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [
    '../lib/module'
  ],
  ghost: {
    url: 'https://demo.ghost.io',
    key: '22444f78447824223cefc48062'
  }
}
