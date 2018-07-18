const { expect } = require('chai')
const { mock, stub } = require('sinon')

const RouterParser = require('./RouterParser')

const parts = {
  "index": {
    "type" : "string"
  },
  "type": {
    "type" : "list"
  }
}

const parts2 = {
  "index": {
    "type" : "string"
  },
  "type": {
    "type" : "string"
  }
}

describe('RouterParser', () => {
  let dependencies

  it('returns index (string) and types (string)', () => {
    const router = new RouterParser('/{index}/{type}', parts)
    expect(router.exec('/my_test_i/type1')).to.deep.equal({
      index: 'my_test_i',
      type: ['type1']
    })
  })
  //
  // it('returns index (string) and types (list)', () => {
  //   const router = new RouterParser('/{index}/{type}/_update_by_query', parts)
  //   expect(router.exec('/my_test_i/type1,type2/_update_by_query')).to.deep.equal({
  //     index: 'my_test_i',
  //     type: [ 'type1', 'type2']
  //   })
  // })
  //
  // it('returns index (string) and types (string)', () => {
  //   const router = new RouterParser('/{index}/{type}/_update_by_query', parts2)
  //   expect(router.exec('/my_test_i/type1/_update_by_query')).to.deep.equal({
  //     index: 'my_test_i',
  //     type: 'type1'
  //   })
  // })
  //
  // it('returns index (string) and types (list) only one type value', () => {
  //   const router = new RouterParser('/{index}/{type}/_update_by_query', parts)
  //   expect(router.exec('/my_test_i/type1/_update_by_query')).to.deep.equal({
  //     index: 'my_test_i',
  //     type: ['type1']
  //   })
  // })
  //
  // it('returns error when index name is invalid', () => {
  //   const router = new RouterParser('/{index}', parts)
  //   expect(() => {
  //     router.exec('/#invalidName')
  //   }).to.throw('Index name must not contain "#\\/*?"<>|"')
  // })
  //
  // it('returns error when type name is invalid', () => {
  //   const router = new RouterParser('/{index}/{type}', parts)
  //   expect(() => {
  //     router.exec('/my_index/#invalidtype')
  //   }).to.throw('Your request: \'\/my_index/#invalidtype\' is not allowed.')
  // })
})
