class Command {
  constructor (client) {
    this.client = client
    this.name = 'none'
    this.category = 'general'
    this.description = "No description."
    this.aliases = []
    this.guildOnly = false
  }

  run () {
    throw new Error(`Function run undefined in ${this.constructor.name}.`)
  }

  _run (message, args) {
    if (!message.guild && this.guildOnly) return
    else return this.run(message, args)
  }
}

module.exports = Command
