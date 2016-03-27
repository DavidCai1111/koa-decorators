'use strict'
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const {route} = require('../../src/router')

const app = new Koa()
app.use(bodyparser())
route(app, `${__dirname}/apis`)

app.listen(3003, () => console.log('listened'))

module.exports = app
