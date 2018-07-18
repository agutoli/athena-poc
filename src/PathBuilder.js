const apiDir = `${__dirname}/rest-api-spec/api`;
const fs = require('fs');

let routes = {}
const files = fs.readdirSync(apiDir)

files.forEach(file => {
  const data = require(`${apiDir}/${file}`)
  const specName = file.replace('.json', '')

  // common parameters
  if (!data[specName]) {
    console.log(data);
    return
  }

  data[specName].url.paths.forEach((x) => {
    routes[x] = [specName, data[specName].methods, data[specName].url.parts]
  })
});

console.log(JSON.stringify(routes));
