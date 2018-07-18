
module.exports = (injection) => {
  return (event, context, callback) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `event.httpMethod: ${event.httpMethod}`
      }),
    };
    callback(null, response);
  }
}
