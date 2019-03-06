require('dotenv').config()

console.log("Conectando...")

const Discord = require('discord.js')

const { readdirSync } = require('fs')
const Enmap = require('enmap')


const client = new Discord.Client()

client.commands = new Enmap()


client.startTime = Date.now()


const cmdFiles = readdirSync('./commands/')
console.log('log', `Carregando o total de ${cmdFiles.length} comandos.`)

cmdFiles.forEach(f => {
  try {
    const props = require(`./commands/${f}`)
    if (f.split('.').slice(-1)[0] !== 'js') return

    console.log('log', `Carregando comando: ${props.help.name}`)
    if (props.init) {
      props.init(client)
    }
    client.commands.set(props.help.name, props)
  } catch (e) {
    console.log(`Impossivel executar comando ${f}: ${e}`)
  }
})


const evtFiles = readdirSync('./events/')
console.log('log', `Carregando o total de ${evtFiles.length} eventos`)
evtFiles.forEach(f => {
  const eventName = f.split('.')[0]
  const event = require(`./events/${f}`)

  client.on(eventName, event.bind(null, client))
})

client.on('error', (err) => {
  console.log('error', err)
})


client.login(process.env.TOKEN)