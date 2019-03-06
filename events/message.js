module.exports = async (client, message) => {

  if (message.author.bot) return

  if (message.channel.id === process.env.SUGESTOES) {
    if (message.content.startsWith('^')) return
    if (message.content.indexOf(process.env.PREFIX) !== 0) {
      await message.react('⬆')
      await message.react('⬇')
      return
    }
  }

  if (message.content.indexOf(process.env.PREFIX) !== 0) return

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  const cmd = client.commands.get(command)
  if (!cmd) return

  console.log('log', `${message.author.username} (${message.author.id}) executou o comando: ${cmd.help.name}`)
  if (cmd.conf.onlyguilds && !message.guild) return 
  cmd.run(client, message, args)
}