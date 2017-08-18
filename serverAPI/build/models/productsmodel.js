'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongodbAutoincrement = require('mongodb-autoincrement');

var _mongodbAutoincrement2 = _interopRequireDefault(_mongodbAutoincrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var productSchema = exports.productSchema = new _mongoose.Schema({
  _id: { type: Number },
  name_: { type: String, required: [true, 'El campo nombre es obligatorio'], trim: true },
  model: { type: String, required: [true, 'El campo modelo es obligatorio'], trim: true },
  typeProduct: { type: String, required: [true, 'El tipo de producto es obligatorio'], trim: true },
  api: { type: String, required: [true, 'El tipo de combustible es obligatorio'], trim: true },
  price: { type: String, required: [true, 'Debe colocar el precio'], trim: true },
  eneable: { type: Boolean, default: true }
}, { timestamps: true });

productSchema.plugin(_mongodbAutoincrement2.default.mongoosePlugin);

var ProductModels = _mongoose2.default.model('product', productSchema);

exports.default = ProductModels;