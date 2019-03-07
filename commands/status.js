const Command = require('../strucutres/Command')

class Limpar extends Command {
  constructor (client) {
    super(client)
    this.requiredArgs = true
    this.category = 'Adiministração'
    this.description ='Mudar status do bot.'
  }

  async run (message, args, { prefix }) {
      if (message.member.id == process.env.OWNERID){
        let status_string = args.join(" ");
        this.client.user.setPresence({ status: 'online', game: { name: status_string } })
      }
  }
}

module.exports = Limpar
