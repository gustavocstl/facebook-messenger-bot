# Messenger Bot - NodeJS and MongoDB using Botkit.ai

Project under development. Created only to be used as a sample for creating other bots.

### Setting
First of all, configure the .env file according to the your facebook page tokens

```
cp .env.example .env
```

Install the dependencies and then start the development server
```
yarn install
yarn dev
```

By default botkit sets this path to receive webhooks:
```
/facebook/receive
```

### Add conversations and menus via API

You can add conversation type of `postback` or `message_received` with simple POST to `/api/conversations`

In this example I used `message_received` type. The response is a simple text.
```json
{
    "type": "message_received",
    "hears": ["hello", "hey", "hi"],
    "response": "Hey, there!"
}
```

---

We can use `postback` too. In this case we need to specify `payload` field.
The response is a group of buttons.
```json
{
	"type": "postback",
	"payload": "chat_started",
	"response": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "Use the buttons below or type a question :D",
          "buttons": [
            {
              "type": "postback",
              "title": "Item 1",
              "payload": "item1"
            },
            {
              "type": "postback",
              "title": "Item 2",
              "payload": "item2"
            }
          ]
        }
	}
}
```

See conversations schema at [src/models/conversations/conversations.js](https://github.com/gucastiliao/facebook-messenger-bot/blob/master/src/models/conversations/conversations.js)

---

#### Docs
- [Botkit](https://github.com/howdyai/botkit)
- [Facebook Messenger](https://developers.facebook.com/docs/messenger-platform/send-messages)

#### Contributions
Contributions are welcome!

Just follow the airbnb style guide and these [commit conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)

