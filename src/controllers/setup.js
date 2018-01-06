/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const _ = require('lodash');
const request = require('request');
const mongoose = require('mongoose');

const PersistentMenuItems = mongoose.model('PersistentMenuItems');

const settings = {
  facebookSettingsUrl: `https://graph.facebook.com/v2.6/me/thread_settings?access_token=${process.env.ACCESS_TOKEN}`,
  facebookMessengerUrl: `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${process.env.ACCESS_TOKEN}`,
  getStartedButton: {
    setting_type: 'call_to_actions',
    thread_state: 'new_thread',
    call_to_actions: [
      {
        payload: 'chat_started',
      },
    ],
  },
  greetingsMessage: {
    setting_type: 'greeting',
    greeting: {
      text: process.env.GREETINGS_MESSAGE,
    },
  },
};

function formatMenuItems(items) {
  const menuItems = [];

  _.forEach(items, (item) => {
    const itemToPush = {
      title: item.title,
      type: item.type,
    };

    if (item.type === 'web_url') itemToPush.url = item.url;
    if (item.type === 'postback') itemToPush.payload = item.payload;
    if (item.type === 'nested') itemToPush.call_to_actions = item.call_to_actions;

    menuItems.push(itemToPush);
  });

  return menuItems;
}

function removePersistentMenu() {
  request.delete(
    settings.facebookSettingsUrl,
    {
      form: {
        setting_type: 'call_to_actions',
        thread_state: 'existing_thread',
      },
    },
  );
}

function setGetStartedButton() {
  request.post(
    settings.facebookSettingsUrl,
    { form: settings.getStartedButton },
    (error) => {
      if (error) {
        console.error(error);
      } else {
        console.warn('Get started button added');
      }
    },
  );
}

function setPersistentMenu() {
  PersistentMenuItems.find({}, { _id: 0, created_at: 0, 'call_to_actions._id': 0 }, (collectionError, items) => {
    if (!items || items.length <= 0) {
      removePersistentMenu();
      return console.warn('No items to add persistent menu');
    }

    const menuItems = formatMenuItems(items);

    const persistentMenu = {
      persistent_menu: [
        {
          locale: 'default',
          call_to_actions: JSON.parse(JSON.stringify(menuItems)),
        },
      ],
    };

    request.post(
      settings.facebookMessengerUrl,
      { form: persistentMenu },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          console.error(`Error persistent menu. HTTP Code: ${response.statusCode} \n ${body}`);
        } else {
          console.warn('Persistent menu added');
        }
      },
    );

    return items;
  });
}

function setGreetingsMessage() {
  request.post(
    settings.facebookSettingsUrl,
    { form: settings.greetingsMessage },
    (error) => {
      if (error) {
        console.warn(error);
      } else {
        console.warn('Greetings message added');
      }
    },
  );
}

setGetStartedButton();
setPersistentMenu();
setGreetingsMessage();
