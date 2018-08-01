const dependencies = {
  executeQuery: require('../athena/executeQuery')
}

module.exports['/{index}/{type}/{id}/_create'] = async ({ index, type, id, settings }, injection) => {
  const { executeQuery } = Object.assign({}, dependencies, injection)

  if (settings.isTimeSeries()) {
    console.log('AQUIIIII:::timeseries');
  }

  return {}
  // return executeQuery(`
  //   SELECT *, "$path" FROM elasticfaker.indexes
  // `, routerParams)
}
