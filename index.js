require('dotenv').config()

const Bot = require('./strucutres/Bot')
const client = new Bot()

client.start(process.env.TOKEN)
