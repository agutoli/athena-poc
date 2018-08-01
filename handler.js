'use strict';

const HttpHandler = require('./src/HttpHandler')

module.exports.index = async (event, context) => {
  try {
    return HttpHandler(event)
  } catch(e) {
    console.error(e)
  }
}
