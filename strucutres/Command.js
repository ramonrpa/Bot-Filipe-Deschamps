class Command {
  constructor (client) {
    this.client = client
    this.name = 'none'
    this.category = 'general'
    this.description = 'No description.'
    this.usage = ''
    this.aliases = []
    this.guildOnly = false
    this.requiredArgs = false
    this.permissions = []
    this.clientPermissions = []
  }

  async run () {
    throw new Error(`Function run undefined in ${this.constructor.name}.`)
  }

  async _run (message, args, content) {
    if (!message.guild && this.guildOnly) return

    const permissions = message.guild && this.permissions.filter(p => !message.channel.permissionsFor(message.member).has(p)).map(p => `\`${p}\``)
    if (this.permissions.length > 0 && permissions && permissions.length > 0) {
      return message.channel.send(`Você não tem as permissões necessarias. ${permissions.join(', ')}`)
    }

    const clientPermissions = message.guild && this.clientPermissions.filter(p => !message.channel.permissionsFor(message.guild.me).has(p)).map(p => `\`${p}\``)
    if (this.clientPermissions.length > 0 && clientPermissions && clientPermissions.length > 0) {
      return message.channel.send(`Você não tem as permissões necessarias. ${clientPermissions.join(', ')}`)
    }

    this.usage = `?? Talvez isso possa ajudá-lo: ${content.prefix + this.name} ${this.usage}`

    if (args.length === 0 && this.requiredArgs) {
      return message.channel.send(this.usage)
    }
    return await this.run(message, args, content)
  }
}

module.exports = Command
