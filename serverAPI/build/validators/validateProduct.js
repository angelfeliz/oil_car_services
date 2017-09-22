'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _functions = require('../utils/functions');

var validateProduct = (0, _functions.validateAsync)({
  _id: {
    presence: false
  },
  name_: {
    presence: true
  },
  productType: {
    presence: true,
    length: {
      minimum: 1,
      message: 'debe de escribir algo en typo de producto'
    }
  },
  model: {
    presence: false,
    length: {
      minimum: 1,
      message: 'debe de escribir algo en model'
    }
  },
  api: {
    presence: false
  },
  price: {
    presence: true
  },
  eneable: {
    presence: false
  }
});
exports.default = validateProduct;