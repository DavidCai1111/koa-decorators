'use strict'
/* global describe, it */
require('should')
const app = require('./fixtures/app')
const obj = require('./fixtures/apis/test')
const request = require('supertest')(app.listen())

describe('public-convert', function () {
  it('should convert async function to koa middleware', async function () {
    let {text} = await request
        .get('/convert')
        .expect(200)

    text.should.containEql('test')
    obj.flag.should.containEql(true)
  })
})
