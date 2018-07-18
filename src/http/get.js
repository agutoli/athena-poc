const dependencies = {
  Routes: require('../routes'),
  GetIndex: require('../UseCases/GetIndex'),
}

module.exports = (injection) => {
  return (event, context, callback) => {
    const { Routes } = Object.assign({}, dependencies, injection)
    const params = Routes.find(x => x.match(event.path))

    console.log('params::', params);
    // GetIndex()
    // const response = {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     message: `event.httpMethod: ${event.httpMethod}`
    //   }),
    // };


    callback(null, '');
  }
}
