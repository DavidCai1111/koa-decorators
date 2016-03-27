'use strict'
const Koa = require('koa')
const {route} = require('../../src/router')

const app = new Koa()
route(app, `${__dirname}/apis`)

app.use(async function (ctx, next) { await next() })

app.listen(3003, () => console.log('listened'))

module.exports = app
