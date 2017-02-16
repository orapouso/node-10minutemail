const minutemail = require('.')

let mail = minutemail()

mail.on('address', (address) => {
  console.log(address)
})

mail.on('mail', (mails) => {
  console.log(mails)
})


setTimeout(() => mail.secondsLeft().then((seconds) => console.log('left:', seconds)), 5000)
setTimeout(() => mail.reset().then(() => console.log('reseted')), 8000)
setTimeout(() => mail.secondsLeft().then((seconds) => console.log('left:', seconds)), 10000)
