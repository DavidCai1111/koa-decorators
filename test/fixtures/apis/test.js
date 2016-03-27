'use strict'
const {router} = require('../../../src/router')
const required = require('../../../src/required')

module.exports = class testController {
  @router({method: 'GET', path: '/test'})
  async get (ctx) {
    ctx.body = 'test'
  }

  @router({method: 'GET', path: '/required-qs'})
  @required({query: ['haha', 'hehe']})
  async testRequiredQs (ctx) {
    ctx.body = 'test'
  }

  @router({method: 'POST', path: '/required-body'})
  @required({body: ['haha', 'hehe']})
  async testRequiredBody (ctx) {
    ctx.body = 'test'
  }
}
