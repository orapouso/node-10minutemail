# 10minutemail Node API

API to create and retrieve mail from [10minutemail](https://10minutemail.com)

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

The factory returns an EventEmitter that emits 3 events whenever they happen

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

Holds the email address retrieved from 10minutemail.com. This is an asynchronous fetch, so it may not be readily available. Listen for the `address` event.

### Methods

#### `mail.start()`

Starts fetching emails and counts from 10minutemail.com

#### `mail.stop()`

Stops fetching emails and counts

## Events

#### `mail.on('address')`

Emitted when the email address is retrieved. After it retrieves, the address is stored in the EventEmitter and accessed as `mail.address`

#### `mail.on('mail')`

Emitted when there are any emails in the inbox

#### `mail.on('count')`

Emitted when for every count request, event if it is 0