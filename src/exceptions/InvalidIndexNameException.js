
class InvalidIndexNameException extends Error {
  constructor(message) {
    super()
    this.name = "InvalidIndexNameException"
    this.message = message
  }
}

module.exports = InvalidIndexNameException
