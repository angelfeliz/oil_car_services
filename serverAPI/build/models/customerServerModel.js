'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customerServerSchema = undefined;

var _productsmodel = require('./productsmodel');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongodbAutoincrement = require('mongodb-autoincrement');

var _mongodbAutoincrement2 = _interopRequireDefault(_mongodbAutoincrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customerServerSchema = exports.customerServerSchema = new _mongoose.Schema({
  _id: { type: Number },
  supervisor: { type: String },
  totalBruto: { type: Number },
  totalDesc: { type: Number },
  totalItebis: { type: Number },
  totalNeto: { type: Number },
  typePayment: { type: String },
  branchOffice: { type: String },
  dateNextOilChange: { type: Date },
  vehicle: {
    vehicle_id: { type: Number },
    brand: { type: String },
    numberPlace: { type: String },
    year: { type: Number },
    km: { type: Number },
    nextKm: { type: Number }
  },
  customer: {
    customer_id: { type: Number },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    rnc: { type: String }
  },
  products: [{
    quantity: { type: Number },
    itebis: { type: Number },
    name_: { type: String },
    price: { type: Number },
    product_id: { type: Number },
    totalProduct: { type: Number },
    typeProduct: { type: String }
  }],
  services: {
    chk_transmision: { type: Boolean, default: false },
    chk_diferencial: { type: Boolean, default: false },
    chk_transferencia: { type: Boolean, default: false },
    chk_liq_frenos: { type: Boolean, default: false },
    chk_liq_hidra: { type: Boolean, default: false },
    chk_agua_bateria: { type: Boolean, default: false },
    chk_agua_radiador: { type: Boolean, default: false },
    chk_limpiavidrios: { type: Boolean, default: false },
    chk_aire_goma: { type: Boolean, default: false },
    chk_cristal: { type: Boolean, default: false },
    chk_aspiradora: { type: Boolean, default: false },
    chk_filtro_aire: { type: Boolean, default: false }
  }
}, { timestamps: true });

customerServerSchema.plugin(_mongodbAutoincrement2.default.mongoosePlugin);

var customerServerModel = _mongoose2.default.model('customerServer', customerServerSchema);

exports.default = customerServerModel;