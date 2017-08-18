'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongodbAutoincrement = require('mongodb-autoincrement');

var _mongodbAutoincrement2 = _interopRequireDefault(_mongodbAutoincrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vehicleSchema = new _mongoose.Schema({
  _id: { type: Number },
  customer_id: { type: Number },
  brand: { type: String, required: [true, 'La marca del vehiculo es obligatorio'], trim: true },
  model: { type: String, required: false, trim: true },
  year: { type: String, required: [true, 'El año es obligatorio'], trim: true },
  typeFuel: { type: String, required: [true, 'El tipo de combustible es obligatorio'], trim: true },
  numberPlace: { type: String, required: false, unique: true },
  km: { type: String },
  nextKm: { type: String }
}, { timestamps: true });

vehicleSchema.plugin(_mongodbAutoincrement2.default.mongoosePlugin);

var vehicleModel = _mongoose2.default.model('vehicle', vehicleSchema);

exports.default = vehicleModel;