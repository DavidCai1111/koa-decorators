'use strict'
/* global describe, it */
require('should')
const utils = require('../../src/private/utils')

describe('utils', function () {
  describe('sureIsArray', function () {
    it('Should get an array when arg is not array', function () {
      let a = 'string'
      utils.sureIsArray(a).should.eql([a])
    })

    it('Should do nothing when arg is an array', function () {
      let a = ['string']
      utils.sureIsArray(a).should.eql(a)
    })
  })

  describe('last', function () {
    it('Should get the last element', function () {
      utils.last([1, 2, 3]).should.eql(3)
    })
  })
})
