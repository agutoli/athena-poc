const dependencies = {
  executeQuery: require('../athena/executeQuery')
}

module.exports['/_search'] = async ({ routerParams, injection }) => {
  const { executeQuery } = Object.assign({}, dependencies, injection)
  return executeQuery(`
    SELECT *, "$path" FROM elasticfaker.indexes
  `, routerParams)
}

module.exports['/{index}/_search'] = async ({ routerParams, injection }) => {
  const { executeQuery } = Object.assign({}, dependencies, injection)

  return {"not_implemented": "keep calm!"}

  let indexes = [routerParams.index]
  if (Array.isArray(routerParams.index)) {
    indexes = routerParams.index.map(x => `index='${x}'`)
  }

  return executeQuery(`
    SELECT *, "$path" FROM elasticfaker.indexes WHERE (${indexes.join(' OR ')})'
  `, routerParams)
}

module.exports['/{index}/{type}/_search'] = async ({ routerParams, injection }) => {
  const { executeQuery } = Object.assign({}, dependencies, injection)

  let indexes = [routerParams.index]
  if (Array.isArray(routerParams.index)) {
    indexes = routerParams.index.map(x => `index='${x}'`)
  }

  let types = [routerParams.type]
  if (Array.isArray(routerParams.type)) {
    types = routerParams.type.map(x => `type='${x}'`)
  }

  return executeQuery(`
    SELECT *, "$path" FROM elasticfaker.indexes WHERE (${indexes.join(' OR ')}) AND (${types.join(' OR ')})
  `, routerParams)
}
