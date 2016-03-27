'use strict'
const assert = require('assert')
const path = require('path')
const koaRouter = require('koa-router')()
const glob = require('glob')
const {sureIsArray, decorate} = require('./private/utils')

const SEPARATOR = '__KOA_DECORATORS_ROUTER__'

let __routersMap = new Map()

function handleDescriptor (target, name, descriptor, {method, path}) {
  assert(typeof method === 'string' && typeof path === 'string', 'method and path should be string')

  __routersMap.set(`${method.toLowerCase()}${SEPARATOR}${path}`, target[name])
  return descriptor
}

function router (...args) { return decorate(handleDescriptor, args) }

function route (app, controllerDir) {
  assert(app && app.createContext && app.callback, 'app should be an instance of koa')
  assert(typeof controllerDir === 'string', 'controllerDir should be an string')

  // Mount all controllers
  glob.sync(path.join(controllerDir, './*.js')).forEach(require)

  for (let [config, controller] of __routersMap) {
    controller = sureIsArray(controller)
    let [method, path] = config.split(SEPARATOR)
    koaRouter[method](path, ...controller)
  }

  app.use(koaRouter.routes())
}

module.exports = {
  router,
  route
}
