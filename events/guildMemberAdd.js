
module.exports = async function onGuildMemberAdd(member) {
  const message = {
    'content': '',
    'embed': {
      'color': 15614245,
      'description': `➦ Olá ${member}, seja bem vindo(a) a Pirates Rust!\n➦ Leia as regras do servidor!`,
      'author': {
        'name': `${member.user.username}`,
        'icon_url': member.user.displayAvatarURL
      }
    }
  }

  const channel = process.env.GREETCHANNEL && member.guild.channels.get(process.env.GREETCHANNEL)
  if (channel) channel.send(message)
}