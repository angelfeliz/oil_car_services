'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotEmpty = exports.validateAsync = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateAsync = exports.validateAsync = _ramda2.default.curry(function (constrains, data) {
  return _validate2.default.async(data, constrains);
});

var isNotEmpty = exports.isNotEmpty = function isNotEmpty(x) {
  return !_ramda2.default.isEmpty(x);
};