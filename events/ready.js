
module.exports = function onReady() {
  console.log('log', `O Bot foi iniciado completamente com ${this.users.size} usuarios em ${this.guilds.size} servidores`)
  this.user.setPresence({ status: 'online', game: { name: process.env.GAME } })
}