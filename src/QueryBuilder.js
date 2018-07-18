const dependencies = {
}

module.exports = (QueryString, injection) => new Promise((resolve, reject) => {
  const { AWS, jsonSourceSerializer } = Object.assign({}, dependencies, injection)
  const athena = new AWS.Athena({ region: 'us-east-1' })
})
