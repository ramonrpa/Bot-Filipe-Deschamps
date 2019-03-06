module.exports = async function onMessage(message) {
 // Get Prefix
  const mentionClient = (message.guild ? message.guild.me.toString() : this.user.toString()) + ' '
  const prefix = message.content.startsWith(mentionClient) ? mentionClient : (process.env.PREFIX && message.content.startsWith(process.env.PREFIX)) ? process.env.PREFIX : null
  
  if (message.channel.id === process.env.SUGESTOES && !message.content.startsWith('^')) {
    await message.react(message.guild.emojis.find(emoji => emoji.name === "apoio"))
    await message.react(message.guild.emojis.find(emoji => emoji.name === "naoapoio"))
    return
  }
  
  if (!prefix || message.author.bot) return

  // Check Command and execute Command
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const commandName = args.shift().toLowerCase()
  const command = this.commands.find((c, i) => i === commandName || c.aliases.includes(commandName))

  if (command) {
    console.log(`${message.author.username} (${message.author.id}) executou o comando: ${command.name}`)
    await command._run(message, args, { prefix })
  }
}
