
module.exports = async (client, member) => {

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

  member.guild.channels.get(process.env.GREETCHANNEL).send(message).catch()
}