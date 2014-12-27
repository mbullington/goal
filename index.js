var collections = require('./lib/collections.js'),
    Dictionary = collections.Dictionary;

module.exports = new Dictionary(collections, require('./lib/helpers.js'));