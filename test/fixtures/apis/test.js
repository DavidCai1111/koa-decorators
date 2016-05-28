'use strict'
const {router} = require('../../../src/router')
const required = require('../../../src/required')
const convert = require('../../../src/public/convert')

let obj = {flag: false}

async function mid (ctx, next) {
  obj.flag = true
  await next()
}

let dec = convert(mid)

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

  @router({method: 'GET', path: '/rate-limit'})
  async testRateLimit (ctx) {
    ctx.body = 'test'
  }

  @router({method: 'GET', path: '/convert'})
  @dec
  async testConvert (ctx) {
    ctx.body = 'test'
  }
}

module.exports = obj
