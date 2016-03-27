'use strict'
/* global describe, before, after */
require('should')
const app = require('./fixtures/app')
const request = require('supertest')(app.listen())

describe('decorate-router', function () {
  it('should get in right controller', async function () {
    let {text} = await request
        .get('/test')
        .expect(200)

    text.should.containEql('test')
  })

  it('should get 404 when path is not defined', async function () {
    await request
        .get('/abncdcdd')
        .expect(404)
  })
})
