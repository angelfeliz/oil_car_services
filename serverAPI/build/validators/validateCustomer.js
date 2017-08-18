'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _functions = require('../utils/functions');

var validateCustomer = (0, _functions.validateAsync)({
  _id: { presence: false },
  firstName: {
    presence: true,
    length: {
      minimum: 1,
      message: 'debe de escribir el primer nombre'
    }
  },
  lastName: {
    presence: true,
    length: {
      minimum: 1,
      message: 'debe de escribir el apellido'
    }
  },
  phoneNumber: {
    presence: true,
    length: {
      minimum: 1,
      message: 'debe de escribir un numero para ser contactado'
    }
  },
  email: { presence: false },
  rnc: { presence: false }
});

exports.default = validateCustomer;