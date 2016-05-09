'use strict'
/* global describe, before, after */
require('should')
const app = require('./fixtures/app')
const request = require('supertest')(app.listen())

describe('decorate-router', function () {
  it('should pass when first visiting', async function () {
    let {text} = await request
        .get('/rate-limit')
        .expect(200)

    text.should.eql('test')
  })

  it('should get 429 when too many requests', async function () {
    await request.get('/rate-limit')
    await request.get('/rate-limit')
    await request.get('/rate-limit')

    await request
      .get('/rate-limit')
      .expect(429)
  })
})
