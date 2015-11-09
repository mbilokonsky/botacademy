module.exports = {
  name: 'echo',
  canParse: function(input) { return true; },
  parse: function(input, context, callback) { callback(null, input); }
};