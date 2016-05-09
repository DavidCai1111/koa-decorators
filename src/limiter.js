'use stirct'
const assert = require('assert')
const {sureIsArray, decorate, last} = require('./private/utils')

let limitMapper = new Map()

function handleDescriptor (target, name, descriptor, rules) {
  assert(rules != null, 'Rules should exist')

  target[name] = sureIsArray(target[name])
  target[name].splice(target[name].length - 1, 0, middleware)

  return descriptor

  async function middleware (ctx, next) {
    let {limit, duration} = rules
    let limiter = limitMapper.get(ctx.url)
    let now = Date.now()

    if (!limiter) {
      limitMapper.set(ctx.url, [now])
      return await next()
    }

    limiter.push(now)
    if (limiter.length > limit) limiter.shift()
    if (limiter.length < limit || now - limiter[0] > duration) return await next()

    ctx.throw(429)
  }
}

function limiter (...args) { return decorate(handleDescriptor, args) }

module.exports = limiter

