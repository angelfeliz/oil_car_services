'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customerSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongodbAutoincrement = require('mongodb-autoincrement');

var _mongodbAutoincrement2 = _interopRequireDefault(_mongodbAutoincrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customerSchema = exports.customerSchema = new _mongoose.Schema({
  _id: { type: Number },
  firstName: { type: String, required: [true, 'El primer nombre es obligatorio'], trim: true },
  lastName: { type: String, required: [true, 'El apellido es obligatorio'], trim: true },
  phoneNumber: { type: String, required: [true, 'El telefono es obligatorio'], trim: true },
  email: { type: String, trim: true },
  rnc: { type: String, trim: true }
}, { timestamps: true });

customerSchema.plugin(_mongodbAutoincrement2.default.mongoosePlugin);

var customerModel = _mongoose2.default.model('customer', customerSchema);

exports.default = customerModel;