
const ResolverRequest = require('./ResolverRequest')

module.exports = async (event) => {
  const res = await ResolverRequest(event)
  return {
    statusCode: res.statusCode || 200,
    body: JSON.stringify(res),
  };
}
