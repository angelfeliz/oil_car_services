'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateError = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _promise = require('./promise');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateError = exports.validateError = function validateError(res, error) {
  res.status(500).json({ error: error });
};