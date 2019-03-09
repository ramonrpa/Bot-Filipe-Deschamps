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

  getUsage (prefix, addContent = false) {
    return  (addContent ? `Talvez isso possa ajudá-lo:` : '') + `${prefix + this.name} ${this.usage}`
  }
  async _run (message, args, content) {
    if (!message.guild && this.guildOnly) return

    if (message.channel.id !== process.env.COMMANDSCHANNEL){
      if (!message.channel.permissionsFor(message.member).has('ADMINISTRATOR')){
        return message.delete(1000)
      }
    }

    const permissions = message.guild && this.permissions.filter(p => !message.channel.permissionsFor(message.member).has(p)).map(p => `\`${p}\``)
    if (this.permissions.length > 0 && permissions && permissions.length > 0) {
      return message.channel.send(`Você não tem as permissões necessarias. ${permissions.join(', ')}`)
    }

    const clientPermissions = message.guild && this.clientPermissions.filter(p => !message.channel.permissionsFor(message.guild.me).has(p)).map(p => `\`${p}\``)
    if (this.clientPermissions.length > 0 && clientPermissions && clientPermissions.length > 0) {
      return message.channel.send(`Você não tem as permissões necessarias. ${clientPermissions.join(', ')}`)
    }

    if (args.length === 0 && this.requiredArgs) {
      return message.channel.send(this.getUsage(content.prefix, true))
    }
    return await this.run(message, args, content)
  }
}

module.exports = Command
