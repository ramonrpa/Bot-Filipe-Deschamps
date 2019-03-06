const emojiToRole = require('../emojiRole.json')

module.exports = async function onraw(event) {

    if (event.t === 'MESSAGE_REACTION_ADD' || event.t === 'MESSAGE_REACTION_REMOVE') {

        if (emojiToRole.id !== event.d.message_id) return

        if (!emojiToRole.emojis[event.d.emoji.name]) return
        
        const channel = this.channels.get(event.d.channel_id)

        const member = channel.guild.members.get(event.d.user_id)

        const role = channel.guild.roles.find(role => role.name == emojiToRole.emojis[event.d.emoji.name])
        
        if (!member || !role) return

        if (event.t === 'MESSAGE_REACTION_ADD') return member.addRole(role)

        member.removeRole(role)
    }

}
