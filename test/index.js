'use strict'
/* global describe */
require('./fixtures/app')
const glob = require('glob')

describe('koa-decorators test', function () {
  glob.sync(`${__dirname}/**/*.js`).forEach(require)
})
