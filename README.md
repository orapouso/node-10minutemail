# 10minutemail Node API

API to create and retrieve mail from [10minutemail](10minutemail.com)

```
npm install 10minutemail
```

## Usage

```js
var minutemail = require('10minutemail')

mail = minutemail({timeout: 10000, startup: true})

mail.on('address', (address) => console.log(address))
mail.on('mail', (mails) => console.log(mails[0].subject))
mail.on('count', (count) => console.log(count)
```

## API

The factory returns an EventEmitter that emmits 3 events whenever they happen

#### `var mail = minutemail([options])`

Creates a new minutemail emitter that starts as soon as it stablishes a connection, and fetches the site every 10 seconds

Options include:

```js
{
  timeout: 10000,
  startup: true    // setting this to false would only create the emitter and retrieve the email address created
}
```

### Properties

##### `mail.address`

Holds the email address retrieved from 10minutemail.com. This is an asyncronous fetch, so it may no be readly available. Listen for the `address` event.

### Methods

#### `mail.start()`

Starts fetching emails and counts from 10minutemail.com

#### `mail.stop()`

Stops fetching emails and counts

## Events

#### `mail.on('address')`

Emmited when the email address is retrieved. After it retrieves, the address is stored in the EventEmitter and accessed as `mail.address`

#### `mail.on('mail')`

Emmited when there are any emails in the inbox

#### `mail.on('count')`

Emmited when for every count request, event if it is 0