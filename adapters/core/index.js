var rx = require('rx');
process.stdin.setEncoding('utf8');

module.exports = {
  instantiate: function(name, parser) {
    var source = require('../' + name);
    var sourceObservable = source.input;
    var outputStream = source.output;

    return instantiate(sourceObservable, outputStream, parser);
  }
}


function instantiate(input, output, parser) {
  'use strict'
  let parse = rx.Observable.fromNodeCallback(parser.parse);

  input
  .flatMap(function(item) {
    return parse(item.message, item.context);
  })
  .subscribe(function(response) {
    output.write(response.message, response.context);
  }, function(err) {
    process.stderr.write('[' + parser.name + ']:', err);
  }, function(done) {
    process.stdout.write('all done');
  });

  return {
    speak: function(message, context) {
      output.write(message, context);
    }
  }
}