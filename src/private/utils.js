'use strict'
const assert = require('assert')

function sureIsArray (arr) { return Array.isArray(arr) ? arr : [arr] }

function decorate (handleDescriptor, entryArgs) {
  if (isDescriptor(last(entryArgs))) return handleDescriptor(entryArgs)
  else return function () { return handleDescriptor(...arguments, ...entryArgs) }
}

function isDescriptor (desc) {
  if (!desc || !desc.hasOwnProperty) return false

  for (let key of ['value', 'initializer', 'get', 'set']) {
    if (desc.hasOwnProperty(key)) return true
  }

  return false
}

function last (arr) {
  assert(Array.isArray(arr), `${arr} should be an array`)

  return arr[arr.length - 1]
}

module.exports = {
  sureIsArray,
  decorate,
  last
}
