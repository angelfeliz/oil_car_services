'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _functions = require('../utils/functions');

var validateVehicle = (0, _functions.validateAsync)({

  _id: { presence: false },
  customer_id: {
    presence: true
  },
  brand: {
    presence: true
  },
  model: {
    presence: false
  },
  year: {
    presence: true,
    length: {
      minimum: 1,
      message: 'debe de escribir el año'
    }
  },
  typeFuel: {
    presence: false
  },
  numberPlace: {
    presence: true
  },
  km: {
    presence: false
  },
  nextKm: {
    presence: false
  },
  createdAt: {
    presence: false
  }
});

exports.default = validateVehicle;