
function rowItemReducer(fields, fieldsTypes) {
  return function(stored, current, index) {
    switch(fieldsTypes[fields[index]]) {
      case 'row':
        stored[fields[index]] = toJson(current.VarCharValue)
        break
      case 'array':
        stored[fields[index]] = toArray(current.VarCharValue)
        break
      default:
        try {
          stored[fields[index]] = JSON.parse(current.VarCharValue)
        } catch(e) {
          stored[fields[index]] = current.VarCharValue
        }
        break
    }
    return stored
  }
}

function getKeyValue(key, _source) {
  try {
    return new RegExp(`${key}=([^\/]*)\/`, 'gi').exec(_source['$path'])[1]
  } catch(e) {
    return null
  }
}

function rowsMap(fields, fieldsTypes) {
  return function(row) {
    const _source = row.Data.reduce(rowItemReducer(fields, fieldsTypes), {})
    const _index = getKeyValue('index', _source)
    const _type = getKeyValue('type', _source)
    return { _index, _type, _source }
  }
}

function tryJson(value) {
  try {
    return JSON.parse(value)
  } catch(e) {
    return value
  }
}

function toJson (rowStr) {
  if (/^\{[^"]+[\w]+[^\"]=.*\}$/.test(rowStr)) {
    return rowStr.substring(1, rowStr.length-1).split(', ').reduce((stored, current) => {
      const keyname = current.split('=', 1)
      stored[keyname] = tryJson(current.replace(`${keyname}=`, ''))
      return stored
    } , {})
  } else {
    return rowStr
  }
}

function toArray (arrayStr) {
  if (!arrayStr) return 
  console.log(arrayStr.substring(1, arrayStr.length-1).split(', '));
  return arrayStr.substring(1, arrayStr.length-1).split(', ')
}

module.exports = (data) => {
  const rows = data.ResultSet.Rows
  const metadata = data.ResultSet.ResultSetMetadata

  const header = rows.shift()

  const fields = header.Data.map(x => x.VarCharValue)
  const fieldsTypes = metadata.ColumnInfo.reduce((stored, current) => {
    stored[current.Name] = current.Type
    return stored
  }, {})

  const res = rows.reduce((stored, current, index) => {
    stored[fields[index]] = current
    return stored
  }, {})

  const hits = rows.map(rowsMap(fields, fieldsTypes))

  return {
    hits: { hits }
  }
}
