const Command = require('../strucutres/Command')
const toapng = require('gif-to-apng')
const download = require('download-file')

class apng extends Command {
    constructor(client) {
        super(client)
        this.guildOnly = true
        this.requiredArgs = true
        this.category = 'Moderação'
        this.description = 'Adiciona emoji animado no servidor convertendo gif para apng.'
        this.usage = '<nome> <link>'
        this.permissions = ['ADMINISTRATOR']
    }

    async run(message, args) {
        let [nome, linkemoji] = args
        let info = {
            filename: "emoji.gif"
        }
        if (!args[0]) return message.reply(this.getUsage(process.env.PREFIX, true))
        if (!args[1]) return message.reply(this.getUsage(process.env.PREFIX, true))
        download(linkemoji, info, function (err) {
            if (!err) {
                toapng('emoji.gif')
                    .then(() => {
                        message.guild.createEmoji('emoji.png', nome)
                        message.reply('Emoji animado adicionado com sucesso!')
                    })
                    .catch(error => console.log('Não convertido.', error))
            } else {
                message.reply('Link invalido.')
            }
        })
    }
}

module.exports = apng
