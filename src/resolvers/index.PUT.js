const uuidv1 = require('uuid/v1');

module.exports = () => {

  console.log(uuidv1());
  return {}
  // return {
  //   "_index": "meu_indice",
  //   "_type": "meu_tipo",
  //   "_id": "AWRr4BiqYqhK-DXdZwAa",
  //   "_version": 1,
  //   "result": "created",
  //   "_shards": {
  //     "total": 2,
  //     "successful": 1,
  //     "failed": 0
  //   },
  //   "created": true
  // }
}
