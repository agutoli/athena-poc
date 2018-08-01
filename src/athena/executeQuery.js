const dependencies = {
  AWS: require("aws-sdk"),
  jsonSourceSerializer: require('../serializers/JsonSourceSerializer')
}

module.exports = (QueryString, routerParams, injection) => new Promise((resolve, reject) => {
  const { AWS, jsonSourceSerializer } = Object.assign({}, dependencies, injection)
  const athena = new AWS.Athena({ region: 'us-east-1' })

  var params = {
    QueryString: QueryString.replace(/\n/g,''),
    ResultConfiguration: {
      OutputLocation: 's3://elasticfaker/indexes'
    },
    QueryExecutionContext: {
      Database: 'elasticfaker'
    }
  }

  athena.startQueryExecution(params, function(err, data) {
    if (err) {
      console.error(err, err.stack)
      reject(err)
    } else {
      QueryResults({
        QueryExecutionId: data.QueryExecutionId
      }, (hits) => {
        resolve(hits)
      })
    }
  })


  function QueryResults(params, callback) {
    athena.getQueryResults(params, function(err, data) {
      if (err) {
        if (err.message.indexOf('RUNNING') > -1 ||
            err.message.indexOf('QUEUED')  > -1) {
          setTimeout(() => {
            QueryResults(params, callback)
          }, 100)
          return
        }
        console.error(err)
        return
      }
      callback(jsonSourceSerializer(data, routerParams))
    });
  }
})
