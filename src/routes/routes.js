const Route = require('route-parser')

module.exports = [
  new Route('/:index/:types/:func'),
  new Route('/:index/:types')
]
