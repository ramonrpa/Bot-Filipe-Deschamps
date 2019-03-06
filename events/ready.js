
module.exports = async (client) => {
 
  console.log('log', `O Bot foi iniciado completamente com ${client.users.size} usuarios em ${client.guilds.size} servidores`)
 
  client.user.setPresence({ status: 'online', game: { name: process.env.GAME } })
}