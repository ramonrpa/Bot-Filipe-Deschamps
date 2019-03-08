const emojiToRole = require('../emojiRole.json')
const { RichEmbed } = require('discord.js')

module.exports = async function onraw(event) {

    if (event.t === 'MESSAGE_REACTION_ADD' || event.t === 'MESSAGE_REACTION_REMOVE') {

        if (event.d.channel_id == process.env.SUGESTIONSCHANNEL) {
            const sugestionchannel = this.channels.get(event.d.channel_id)
            if (!sugestionchannel) return

            sugestionchannel.fetchMessage(event.d.message_id).then(message => {
                const aproves = message.reactions.find(r => r.emoji.name === 'apoio')
                const rejects = message.reactions.find(r => r.emoji.name === 'naoapoio')
                if (rejects != null) {
                    const total = aproves.users.size + rejects.users.size - 2
                    if (total >= process.env.SUGESTIONMINVOTE) {
                        var sub = total - rejects.users.size
                        var percentagemAproves = (sub / total) * 100
                        if (percentagemAproves >= process.env.MINIMUMPERCENTAGEMOFSUPPORT){
                            const adminsugestionchannel = this.channels.get(process.env.ADMINSUGGESTIONSCHANNEL)
                            const embed = new RichEmbed()
                            .setColor(15614245)
                            .addField('**Sugestão**', message.content)
                            .setFooter(`Enviado por ${message.member.user.tag}`)
                            adminsugestionchannel.send(embed)
                        }
                    }
                }
            })

        }

        if (emojiToRole.id === event.d.message_id) {

            if (!emojiToRole.emojis[event.d.emoji.name]) return

            const channel = this.channels.get(event.d.channel_id)

            const member = channel.guild.members.get(event.d.user_id)

            const role = channel.guild.roles.find(role => role.name == emojiToRole.emojis[event.d.emoji.name])

            if (!member || !role) return

            if (event.t === 'MESSAGE_REACTION_ADD') return member.addRole(role)

            member.removeRole(role)
        }
    }

}