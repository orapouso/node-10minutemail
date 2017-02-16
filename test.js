const minutemail = require('.')

let mail = minutemail()

mail.on('address', (address) => {
  console.log(address)
})

mail.on('mail', (mails) => {
  console.log(mails)
})


