'use strict'
const assert = require('assert')
const {sureIsArray, decorate} = require('../private/utils')

function handleDescriptor (target, name, descriptor, middleware) {
  target[name] = sureIsArray(target[name])
  target[name].splice(target[name].length - 1, 0, middleware)

  return descriptor
}

function convert (middleware) {
  assert(typeof middleware === 'function', 'middleware should be a function')
  return decorate(handleDescriptor, [middleware])
}

module.exports = convert
