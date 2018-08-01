const patternTypes = {
  'string': '([^_][^,^\/]*)',
  'list': '([^_][\,a-z0-9\_\-\]+)',
}

const InvalidIndexNameException = require('./exceptions/InvalidIndexNameException')

class RouterParser {
  constructor(path, parts) {
    this.rules = this._parsePath(path, parts)
  }

  _parsePath(path, parts) {
    const pattern = /\{([^\}]*)\}/ig;

    let response;
    let newPath = path
    let variables = []

    do {
      response = pattern.exec(path);
      if (!parts) break
      if (response) {
        variables.push({ type: parts[response[1]].type, name: response[1] })
        newPath = newPath.replace(`{${response[1]}}`, patternTypes[parts[response[1]].type])
      }
    } while (response)

    return {
      variables,
      regex: new RegExp('^' + newPath + '$', 'ig')
    }
  }

  _validateAllowedCharacters(values, field) {
    values.forEach((value) => {
      if (/^[_|-]/.test(value)) {
        throw new InvalidIndexNameException(`${field} name can not starts with "_" or "-"`)
      }

      if (/[\#\*\?\"\<\>\|]/.test(value)) {
        throw new InvalidIndexNameException(`${field} name must not contain "#\\\/*?"<>|"`)
      }
    })
  }

  _toType(value, type) {
    if (type === 'list') {
      const types = value.split(',')
      this._validateAllowedCharacters(types, 'IndexName')
      return types
    }

    this._validateAllowedCharacters([value], 'IndexName')
    return value
  }

  exec(requestPath) {
    const result = this.rules.regex.exec(requestPath)

    if (!result) {
      return null
    }


    result.shift()

    const values = Array.from(result)

    return this.rules.variables.reduce((stored, current, index) => {
      stored[current.name] = this._toType(values[index], current.type)
      return stored
    }, {})
  }
}

module.exports = RouterParser
