module.exports = {
  fromConfig: function(config) {
    return create(
      require('../../parsers/' + config.parser),
      config.adapters
    );
  }
}

var core_adapter = require('../../adapters/core');
function create(parser, adapters) {
  adapters.forEach(function(adapterName) {
    core_adapter.instantiate(adapterName, parser);
  });
}