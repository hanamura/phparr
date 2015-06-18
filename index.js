var isArray   = require('lodash.isarray');
var isBoolean = require('lodash.isboolean');
var isNull    = require('lodash.isnull');
var isNumber  = require('lodash.isnumber');
var isObject  = require('lodash.isobject');
var isString  = require('lodash.isstring');

var phparr = function(data, space) {
  switch (true) {
    case isNumber(space):
      var len = Math.max(Math.min(space, 10), 0);
      space = '';
      while (len--) { space += ' ' }
      break;
    case isString(space):
      space = space.slice(0, 10);
      break;
    default:
      space = undefined;
  }

  var indent = function(item) {
    return space
      ? item
        .split('\n')
        .map(function(line) { return space + line })
        .join('\n')
      : item;
  };

  switch (true) {
    case isNumber(data):
    case isString(data):
    case isBoolean(data):
    case isNull(data):
      return JSON.stringify(data);
    case isArray(data):
      return ''
        + (space ? '[\n' : '[')
        + data
          .map(function(item) { return phparr(item, space) })
          .map(indent)
          .join(space ? ',\n' : ',')
        + (space ? '\n]' : ']');
    case isObject(data):
      var items = [];
      for (var k in data) {
        items.push(''
          + JSON.stringify(k)
          + (space ? ' => ' : '=>')
          + phparr(data[k], space)
        );
      }
      return ''
        + (space ? '[\n' : '[')
        + items
          .map(indent)
          .join(space ? ',\n' : ',')
        + (space ? '\n]' : ']');
    default:
      throw new Error('parse error');
  }
};

module.exports = phparr;
