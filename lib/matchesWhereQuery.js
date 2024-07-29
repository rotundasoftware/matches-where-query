"use strict";

var _underscore = _interopRequireDefault(require("underscore"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
module.exports = function (object, whereQuery) {
  var _loop = function _loop() {
      var queryAttribute = whereQuery[attributeName];
      var objectAttribute = object[attributeName];
      if (_underscore["default"].isObject(queryAttribute) && queryAttribute.comparator) {
        if (_underscore["default"].isUndefined(queryAttribute.value) && !['isNull', 'isNotNull'].includes(queryAttribute.comparator)) throw new Error('Value must be supplied for comparator queries');
        switch (queryAttribute.comparator) {
          case 'doesNotEqual':
            if (objectAttribute === queryAttribute.value) return {
              v: false
            };
            break;
          case 'isGreaterThan':
            if (!objectAttribute || objectAttribute <= queryAttribute.value) return {
              v: false
            };
            break;
          case 'isGreaterThanOrEqualTo':
            if (!objectAttribute || objectAttribute < queryAttribute.value) return {
              v: false
            };
            break;
          case 'isLessThan':
            if (!objectAttribute || objectAttribute >= queryAttribute.value) return {
              v: false
            };
            break;
          case 'isLessThanOrEqualTo':
            if (!objectAttribute || objectAttribute > queryAttribute.value) return {
              v: false
            };
            break;
          case 'isBetween':
            if (!_underscore["default"].isArray(queryAttribute.value) || queryAttribute.value.length !== 2) {
              throw new Error('Value supplied for isBetween comparator must be an array [ min, max ]');
            }
            if (!objectAttribute || objectAttribute < queryAttribute.value[0] || objectAttribute > queryAttribute.value[1]) return {
              v: false
            };
            break;
          case 'startsWith':
            if (!objectAttribute) return {
              v: false
            };
            // eslint-disable-next-line max-len
            if (!_underscore["default"].isString(objectAttribute) || !_underscore["default"].isString(queryAttribute.value)) throw new Error('For startsWith comparator both the object attribute and the query value must be strings.');
            if (!_startsWith(objectAttribute, queryAttribute.value)) return {
              v: false
            };
            break;
          case 'endsWith':
            if (!objectAttribute) return {
              v: false
            };
            // eslint-disable-next-line max-len
            if (!_underscore["default"].isString(objectAttribute) || !_underscore["default"].isString(queryAttribute.value)) throw new Error('For endsWith comparator both the object attribute and the query value must be strings.');
            if (!_endsWith(objectAttribute, queryAttribute.value)) return {
              v: false
            };
            break;
          case 'isNull':
            if (!_underscore["default"].isNull(objectAttribute)) return {
              v: false
            };
            break;
          case 'isNotNull':
            if (_underscore["default"].isNull(objectAttribute)) return {
              v: false
            };
            break;
          case 'contains':
            if (!objectAttribute) return {
              v: false
            };
            if (_underscore["default"].isString(objectAttribute)) {
              return {
                v: objectAttribute.includes(queryAttribute.value)
              };
            } else if (_underscore["default"].isArray(objectAttribute)) {
              return {
                v: objectAttribute.some(function (value) {
                  return _underscore["default"].isEqual(value, queryAttribute.value);
                })
              };
            } else {
              return {
                v: false
              };
            }
          default:
            throw new Error('Invalid comparator ' + queryAttribute.comparator);
        }
      } else if (_underscore["default"].isArray(queryAttribute)) {
        if (!_underscore["default"].contains(queryAttribute, objectAttribute)) return {
          v: false
        };
      } else {
        if (queryAttribute !== objectAttribute) return {
          v: false
        };
      }
    },
    _ret;
  for (var attributeName in whereQuery) {
    _ret = _loop();
    if (_ret) return _ret.v;
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