const Command = require('../strucutres/Command')

class Limpar extends Command {
  constructor (client) {
    super(client)
    this.guildOnly = true
    this.requiredArgs = true
    this.category = 'Moderação'
    this.description ='Apaga mensagens de um canal.'
    this.usage = '[1 - 100]'
    this.permissions = ['MANAGE_MESSAGES']
  }

  async run (message, [ count ], { prefix }) {
    count = parseInt(count)
    if (!isNaN(count) && !(count >= 1) && !(count <= 100)) {
      return message.channel.send(this.getUsage(prefix, true))
    }
    try {
    const messages = await message.channel.bulkDelete(count)
    const m = await message.channel.send(`${messages.size} mensagens foram deletadas.`)
    await m.delete(2000)
    } catch (_) {

    } 
  }
}

module.exports = Limpar
