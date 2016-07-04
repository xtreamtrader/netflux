var host = '127.0.0.1'
var port = 9000
let netflux = require('../dist/netflux.es2015.umd.js')

const DEBUG_PING = 'DEBUG_PING'
const DEBUG_PONG = 'DEBUG_PONG'

let bot = new netflux.Bot()
bot.listen({host, port, log: true})

bot.onWebChannel = (wc) => {
  wc.onJoining = (id) => {
    bot.log('joining', 'Joinning of a new client [' + id + ']')
  }

  wc.onLeaving = (id) => {
    bot.log('leaving', 'Leaving of client [' + id + ']')
  }

  wc.onMessage = (id, msg) => {
    bot.log('message', '[From ' + id + '] ' + msg)
    if (msg === DEBUG_PING) wc.send(DEBUG_PONG)
  }

  wc.onChannelClose = (evt) => {
    bot.log('closed', 'WebChannel has been closed')
  }
}
