var c = require('./lib/collections.js');

module.exports = Object.freeze(c.merge({}, c, require('./lib/helpers.js')));