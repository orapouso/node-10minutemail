const debug = require('debug')('10minutemail')
const EventEmitter = require('events').EventEmitter
const request = require('request').defaults({jar: true})

module.exports = create

function noop(){}

function create({timeout:timeout=10000, startup: startup=true}={}) {
  let ev = new EventEmitter()
  
  let mailTimer = 0
  let countTimer = 0
  
  ev.start = timeoutMail
  ev.stop = () => {
    clearTimeout(mailTimer)
    clearTimeout(countTimer)
  }
  
  ev.reset = () => {
    return reqCommon('https://10minutemail.com/10MinuteMail/resources/session/reset', 'reset')
  }
  
  ev.secondsLeft = () => {
    return reqCommon('https://10minutemail.com/10MinuteMail/resources/session/secondsLeft', 'secondsLeft')
  }
  
  request('https://10minutemail.com/10MinuteMail/index.html', (err) => {
    if (err) { debug('ERR', err) }
        
    reqAddress()
      .then((address) => {
        debug(`address: ${address}`)
        ev.address = address
        ev.emit('address', address)
      })
      .then(startup ? timeoutMail : noop)
  })  

  function timeoutMail() {
    reqMail()
      .then((body) => {
        debug('mail body', body)
        if (body.length) {
          ev.emit('mail', body)          
        }
      })
      .then(() => mailTimer = setTimeout(reqMail, timeout))
      .catch((err) => ev.emit('error', err))
    
    reqCount()
      .then((count) => {
        debug('count body', count)
        ev.emit('count', count)
      })
      .then(() => countTimer = setTimeout(reqCount, timeout))
      .catch((err) => ev.emit('error', err))
  }
  
  return ev
}

//////////////////////////////////

let reqAddress = reqCommon.bind(null, 'https://10minutemail.com/10MinuteMail/resources/session/address', 'address')
let reqMail = reqCommon.bind(null, 'https://10minutemail.com/10MinuteMail/resources/messages/messagesAfter/0', 'mail')
let reqCount = reqCommon.bind(null, 'https://10minutemail.com/10MinuteMail/resources/messages/messageCount', 'count')

function reqCommon(url, type) {
  debug(`requesting ${type}`)
  return new Promise((res, rej) => {
    request(url, (err, response, body) => {
      if (err) {return rej(err)}
      res(body)
    })
  })
}

