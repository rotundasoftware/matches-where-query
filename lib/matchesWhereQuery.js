"use strict";

var _underscore = _interopRequireDefault(require("underscore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (object, whereQuery) {
  for (var attributeName in whereQuery) {
    var queryAttribute = whereQuery[attributeName];
    var objectAttribute = object[attributeName];

    if (_underscore["default"].isObject(queryAttribute) && queryAttribute.comparator) {
      if (!queryAttribute.value) throw new Error('Value must be supplied for comparator queries');

      switch (queryAttribute.comparator) {
        case 'doesNotEqual':
          if (objectAttribute === queryAttribute.value) return false;
          break;

        case 'isGreaterThan':
          if (objectAttribute <= queryAttribute.value) return false;
          break;

        case 'isGreaterThanOrEqualTo':
          if (objectAttribute < queryAttribute.value) return false;
          break;

        case 'isLessThan':
          if (objectAttribute >= queryAttribute.value) return false;
          break;

        case 'isLessThanOrEqualTo':
          if (objectAttribute > queryAttribute.value) return false;
          break;

        case 'isBetween':
          if (!_underscore["default"].isArray(queryAttribute.value) || queryAttribute.value.length !== 2) {
            throw new Error('Value supplied for isBetween comparator must be an array [ min, max ]');
          }

          if (objectAttribute < queryAttribute.value[0] || objectAttribute > queryAttribute.value[1]) return false;
          break;

        case 'startsWith':
          if (!objectAttribute) return false; // eslint-disable-next-line max-len

          if (!_underscore["default"].isString(objectAttribute) || !_underscore["default"].isString(queryAttribute.value)) throw new Error('For startsWith comparator both the object attribute and the query value must be strings.');
          if (!_startsWith(objectAttribute, queryAttribute.value)) return false;
          break;

        case 'endsWith':
          if (!objectAttribute) return false; // eslint-disable-next-line max-len

          if (!_underscore["default"].isString(objectAttribute) || !_underscore["default"].isString(queryAttribute.value)) throw new Error('For endsWith comparator both the object attribute and the query value must be strings.');
          if (!_endsWith(objectAttribute, queryAttribute.value)) return false;
          break;

        default:
          throw new Error('Invalid comparator ' + queryAttribute.comparator);
      }
    } else if (_underscore["default"].isArray(queryAttribute)) {
      if (!_underscore["default"].contains(queryAttribute, objectAttribute)) return false;
    } else {
      if (queryAttribute !== objectAttribute) return false;
    }
  }

  return true;
};

function _startsWith(str, starts) {
  return str.lastIndexOf(starts, 0) === 0;
}

function _endsWith(str, ends) {
  var position = str.length - ends.length;
  return position >= 0 && str.indexOf(ends, position) === position;
}