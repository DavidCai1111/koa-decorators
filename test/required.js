'use strict'
/* global describe, before, after */
require('should')
const app = require('./fixtures/app')
const request = require('supertest')(app.listen())

describe('decorate-router', function () {
  it('should get 412 when missing required qs', async function () {
    await request
      .get('/required-qs?haha=123')
      .expect(412)
  })

  it('should pass when all qs exist', async function () {
    let {text} = await request
        .get('/required-qs?haha=123&hehe=123')
        .expect(200)

    text.should.eql('test')
  })

  it('should get 412 when missing required body', async function () {
    await request
      .post('/required-body')
      .send({haha: '123'})
      .expect(412)
  })

  it('should pass when all qs exist', async function () {
    let {text} = await request
        .post('/required-body')
        .send({
          haha: '123',
          hehe: '123'
        })
        .expect(200)

    text.should.eql('test')
  })
})
