const dependencies = {
  executeQuery: require('../athena/executeQuery')
}

module.exports['/{index}/{type}/{id}/_create'] = async ({ routerParams, injection }) => {
  const { executeQuery } = Object.assign({}, dependencies, injection)
  return {}
  // return executeQuery(`
  //   SELECT *, "$path" FROM elasticfaker.indexes
  // `, routerParams)
}
