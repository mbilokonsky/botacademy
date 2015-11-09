var rx = require('rx');
process.stdin.setEncoding('utf8');

module.exports = {
  input: getInput(),
  output: getOutput()
}

function getInput() {
  return rx.Observable.fromEvent(process.stdin, 'data').map(function(message) {
    return {
      message: message,
      context: {
        source: 'cli',
        user_id: process.env.USER,
        time: Date.now()
      }
    }
  })
}

function getOutput() {
  return {
    write: function(message, context) {
      process.stdout.write(message);
    }
  };
}