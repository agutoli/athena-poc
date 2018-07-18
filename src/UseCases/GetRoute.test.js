const { expect } = require('chai')
const { mock, stub } = require('sinon')

const GetRoute = require('./GetRoute')

describe('GetRoute', () => {
  let dependencies
  beforeEach(async () => {
    GetRoute('/index/a,vs', dependencies)
  })

  it('returns index and types', () => {
    expect(GetRoute('/my_index/a,vs', dependencies)).to.deep.equal({
      index: 'my_index',
      types: ['a', 'vs'],
      func: null
    })
  })

  it('returns index, types and function', () => {
    expect(GetRoute('/my_index/a,vs/_search', dependencies)).to.deep.equal({
      index: 'my_index',
      types: ['a', 'vs'],
      func: '_search'
    })
  })
})
