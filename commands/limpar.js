module.exports = {
  run: (client, message, args) => {

    if (!message.member) return


    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Você não pode fazer isto :c')

    var limit = 100
    if (args.length === 1) {
      limit = parseInt(args[0])
    } else {
      return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)
    }

    if (!Number.isInteger(limit)) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)
 
    limit++

    limit = Math.min(limit, 99)

    message.channel.bulkDelete(limit)
      .then(messages => {
        message.channel.send(`${messages.size} mensagens foram deletadas.`)
          .then(message => setTimeout(() => message.delete(), 2000))
      })
  },

  conf: {
    onlyguilds: true
  },

  get help () {
    return {
      name: 'limpar',
      category: 'Moderação',
      description: 'Apaga mensagens de um canal.',
      usage: 'limpar [1 - 100]'
    }
  }
}