const Command = require('../strucutres/Command')

class AddEmoji extends Command {
    constructor(client) {
        super(client)
        this.guildOnly = true
        this.requiredArgs = true
        this.category = 'Moderação'
        this.description = 'Adiciona emoji ao servidor.'
        this.usage = '<nome> <link>'
        this.permissions = ['ADMINISTRATOR']
    }

    async run(message, args) {
        let [nome, linkemoji] = args
        if (!args[0]) return message.reply(this.getUsage(process.env.PREFIX, true))
        if (!args[1]) return message.reply(this.getUsage(process.env.PREFIX, true))
        message.guild.createEmoji(linkemoji, nome).then(emoji => message.reply(`Criado emoji com o nome ${emoji.name}`))
        .catch(console.error);
    }
}

module.exports = AddEmoji