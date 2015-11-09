var config = require('./config.json')
var rx = require('rx');
var Twit = require('twit');

var T = new Twit({
  consumer_key: config.tokens.consumer,
  consumer_secret: config.tokens.consumer_secret,
  access_token: config.tokens.access,
  access_token_secret: config.tokens.access_secret
});

function getInput() {
  'use strict'
  let stream = T.stream('statuses/filter', {track: config.track});
  return rx.Observable.fromEvent(stream, 'message').map(function(message) {
    let text = message.text.split(' ').filter(function(word) { return word.charAt(0) !== '@'; }).join(' ');

    return {
      message: text,
      context: {
        trigger: message.id_str,
        sender: message.source,
        user: message.user,
        geo: message.geo,
        originalContext: message
      }
    }
  });
}

function getOutput() {
  return {
    write: function(message, context) {
      if (context.user) {
        message = '@' + context.user.screen_name + ' ' + message;
      }

      if (context.trigger) {
        T.post('statuses/update', { status: message, in_reply_to_status_id: context.trigger }, function(err, data, response) {
          // log this?
          if (err) {
            console.log(err);
          }
        })
      } else {
        T.post('statuses/update', {status: message}, function(err, data, result) {
          if (err) {
            console.log(err);
          }
        })
      }
    }
  }
}

module.exports = {
  input: getInput(),
  output: getOutput()
};