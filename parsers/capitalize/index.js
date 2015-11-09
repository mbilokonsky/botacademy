module.exports = {
  name: 'capitalize',
  canParse: function(input) { return true; },
  parse: function(input, context, callback) {
    outputMessage = input.toUpperCase();
    outputContext = context;
    callback(null, {message: outputMessage, context: outputContext});
  }
};