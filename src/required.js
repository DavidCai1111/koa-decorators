'use strict'
const assert = require('assert')
const {sureIsArray, decorate} = require('./private/utils')

function handleDescriptor (target, name, descriptor, rules) {
  assert(rules != null, 'Rules should exist')

  target[name] = sureIsArray(target[name])
  target[name].splice(target[name].length - 1, 0, middleware)

  return descriptor

  async function middleware (ctx, next) {
    if (rules.query) {
      rules.query = sureIsArray(rules.query)

      for (let name of rules.query) {
        if (!ctx.query[name]) ctx.throw(412, `Query: ${name} required`)
      }
    }

    if (rules.body) {
      assert(ctx.request.body, 'Missing ctx.request.body, please add a bodyparser middleware')
      rules.body = sureIsArray(rules.body)

      for (let name of rules.body) {
        if (!ctx.request.body[name]) ctx.throw(412, `Request body: ${name} required`)
      }
    }

    await next()
  }
}

function required (...args) { return decorate(handleDescriptor, args) }

module.exports = required
