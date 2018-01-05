/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const request = require('request');
const botConfigs = require('../config/bot-configs.json');

const settings = {
  facebookSettingsUrl: `https://graph.facebook.com/v2.6/me/thread_settings?access_token=${process.env.ACCESS_TOKEN}`,
  getStartedButton: {
    setting_type: 'call_to_actions',
    thread_state: 'new_thread',
    call_to_actions: [
      {
        payload: 'chat_started',
      },
    ],
  },
  persistentMenu: {
    setting_type: 'call_to_actions',
    thread_state: 'existing_thread',
    call_to_actions: botConfigs.persistentMenuItems,
  },
  greetingsMessage: {
    setting_type: 'greeting',
    greeting: {
      text: botConfigs.greetingsMessage,
    },
  },
};

function setPersistentMenu() {
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

  request.post(
    settings.facebookSettingsUrl,
    { form: settings.persistentMenu },
    (error) => {
      if (error) {
        console.error(error);
      } else {
        console.warn('Persistent menu added');
      }
    },
  );
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

setPersistentMenu();
setGreetingsMessage();
