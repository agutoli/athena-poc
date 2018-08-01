class Settings {
  constructor(config) {
    this.config = config
  }

  isTimeSeries() {
    return this.config['config:timeSeries']
  }
}

module.exports = (index) => {

  if (!index) {
    return new Settings({})
  }

  const indexEnv = process.env[`INDEX:${index}`]
  const config = indexEnv.split('@')
                         .reduce((stored, current) => {
    let [ key, value ] = current.split('=')

    if (value === 'true') {
      value = true
    }

    if (value === 'false') {
      value = false
    }
    stored[key] = value
    return stored
  }, {})

  return new Settings(config)
}
