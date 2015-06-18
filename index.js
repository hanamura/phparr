var isArray   = require('lodash.isarray');
var isBoolean = require('lodash.isboolean');
var isNull    = require('lodash.isnull');
var isNumber  = require('lodash.isnumber');
var isObject  = require('lodash.isobject');
var isString  = require('lodash.isstring');

var indent = function(item) {
  return item
    .split('\n')
    .map(function(line) { return '  ' + line })
    .join('\n');
};

var phparr = function(data) {
  switch (true) {
    case isNumber(data):
    case isString(data):
    case isBoolean(data):
    case isNull(data):
      return JSON.stringify(data);
    case isArray(data):
      return ''
        + '[\n'
        + data
          .map(phparr)
          .map(indent)
          .join(',\n')
        + '\n]';
    case isObject(data):
      var items = [];
      for (var k in data) {
        items.push(''
          + JSON.stringify(k)
          + ' => '
          + phparr(data[k])
        );
      }
      return ''
        + '[\n'
        + items
          .map(indent)
          .join(',\n')
        + '\n]';
    default:
      throw new Error('parse error');
  }
};

module.exports = phparr;
