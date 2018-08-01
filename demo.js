var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:3000',
  log: 'trace'
});

// client.search({
//   index: 'usuarios',
//   type: 'pj',
//   q: 'pants'
// }).then((response) => {
//   console.log(response.hits.hits)
// })

client.create({
  index: 'myindex',
  type: 'mytype',
  id: '1',
  body: {
    title: 'Test 1',
    tags: ['y', 'z'],
    published: true,
    published_at: '2013-01-01',
    counter: 1
  }
}).then((response) => {
  console.log(response)
})
