const fs = require('fs')
const urls = require('./urls')
const RouterParser = require('./RouterParser')
const ConfigParse = require('./ConfigParse')

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
      routerParams = (new RouterParser(url, parts)).exec(event.path)
      if (routerParams) {
        methods = urls[url][1]
        resolverName = urls[url][0]
        urlMatched = url
        break
      }
    }
  }

  if (!resolverName) {
    return {
      statusCode: 204,
      Message: 'no content'
    }
  }

  const fileName = `${__dirname}/resolvers/${resolverName}.${httpMethod}.js`
  const spec = require(`${__dirname}/rest-api-spec/api/${resolverName}.json`)

  if (!fs.existsSync(fileName)) {
    return {
      statusCode: 501,
      Message: `module '${resolverName}' not Implemented`
    }
  }

  const resolver = require(fileName)

  if (!resolver.hasOwnProperty(urlMatched)) {
    return {
      statusCode: 501,
      Message: `router '${urlMatched}' not Implemented`
    }
  }

  const settings = ConfigParse(routerParams.index)

  return resolver[urlMatched]({
    spec,
    settings,
    request: event.path,
    ...routerParams
  })
}
