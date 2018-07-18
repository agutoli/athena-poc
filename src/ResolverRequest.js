const fs = require('fs')
const urls = require('./urls')
const RouterParser = require('./RouterParser')

module.exports = async (event) => {
  let resolverName
  let urlMatched;
  let httpMethod = event.httpMethod
  let methods = []
  let routerParams = {}

  if (event.path == '/') {
    return {
      "name" : "elasticfaker",
      "cluster_name" : "elasticfaker",
      "version" : {
        "number" : "5.5.2",
        "build_date" : "2017-10-18T04:35:01.381Z",
        "build_snapshot" : false
      },
      "tagline" : "You Know, for search and save money!"
    }
  }

  if (urls.hasOwnProperty(event.path)) {
    methods = urls[event.path][1]
    resolverName = urls[event.path][0]
    urlMatched = event.path
  }

  if (!resolverName) {
    for(let url in urls) {
      const parts = urls[url][2]
      routerParams = new RouterParser(url, parts).exec(event.path)
      if (routerParams) {
        methods = urls[url][1]
        resolverName = urls[url][0]
        urlMatched = url
        break
      }
    }
  }

  const fileName = `${__dirname}/resolvers/${resolverName}.${httpMethod}.js`
  const settings = require(`${__dirname}/rest-api-spec/api/${resolverName}.json`)

  if (!fs.existsSync(fileName)) {
    return {
      statusCode: 501,
      Message: `module '${resolverName}' not Implemented`
    }
  }

  if (!resolverName) {
    return {
      statusCode: 404,
      Message: 'not found'
    }
  }

  const resolver = require(fileName)

  if (!resolver.hasOwnProperty(urlMatched)) {
    return {
      statusCode: 501,
      Message: `router '${urlMatched}' not Implemented`
    }
  }

  return resolver[urlMatched]({ request: event.path, routerParams, settings })
}
