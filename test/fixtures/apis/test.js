'use strict'
const {router} = require('../../../src/router')

module.exports = class testController {
  @router({method: 'GET', path: '/test'})
  async get (ctx) {
    ctx.body = 'test'
  }
}
