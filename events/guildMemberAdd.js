
module.exports = async function onGuildMemberAdd(member) {
  const memberrole = member.guild.roles.find(r => r.name == "Membro's")
  const message = {
    'content': '',
    'embed': {
      'color': 15614245,
      'description': `➦ Olá ${member}, seja bem vindo(a)!\n➦ Leia as regras do servidor!`,
      'author': {
        'name': `${member.user.username}`,
        'icon_url': member.user.displayAvatarURL
      }
    }
  }

  const channel = process.env.GREETCHANNEL && member.guild.channels.get(process.env.GREETCHANNEL)
  if (channel) channel.send(message)
  member.setRoles([memberrole])
}

