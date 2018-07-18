'use strict';

const HttpHandler = require('./src/HttpHandler')

module.exports.index = async (event, context, callback) => {
  const res = await HttpHandler(event)
  console.log(res, 'asdasdas');
  callback(null, res)
}
