const uuidv1 = require('uuid/v1');

module.exports = () => {
  console.log(uuidv1());
  return {
    statusCode: 201,
    Message: 'Created'
  }
}
