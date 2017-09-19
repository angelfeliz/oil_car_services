import  { productSchema } from './productsmodel';
import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongodb-autoincrement';


export const checkoutSchema = new Schema({
  _id: { type: Number },
  statu: { type: String, default: "complete" },
  supervisor: { type: String, default:undefined },
  mechanic: { type: String, default: undefined},
  totalBruto: { type: Number },
  totalDesc: { type: Number },
  totalItebis: { type: Number },
  totalNeto: { type: Number },
  paymentType: { type: String },
  branchOffice: { type: String },
  ncfType: { type: Number },
  ncf: { type: String },
  customer: {
     customer_id: { type: Number },
     email: { type: String },
     firstName: { type: String },
     lastName: { type: String },
     phoneNumber: { type: String },
     rnc: { type: String },
   },
  products: [{
    quantity: { type: Number },
    itebis: { type: Number },
    name_: { type: String },
    price: { type: Number },
    product_id: { type: Number },
    totalProduct: { type: Number },
    productType: { type: String },
  }],
  vehicle: {
    vehicle_id: { type: Number, default:undefined },
    brand: { type: String, default:undefined },
    model: {type: String, default:undefined },
    numberPlace: { type: String, default:undefined },
    year: { type: Number, default:undefined },
    km: { type: Number, default:undefined },
    nextKm: { type: Number, default:undefined },
  },
  services: {
      chk_transmision: {type: Boolean, default: false},
      chk_diferencial: {type: Boolean, default: false},
      chk_transferencia: {type: Boolean, default: false},
      chk_liq_frenos: {type: Boolean, default: false},
      chk_liq_hidra: {type: Boolean, default: false},
      chk_agua_bateria:  {type: Boolean, default: false},
      chk_agua_radiador:  {type: Boolean, default: false},
      chk_limpiavidrios:  {type: Boolean, default: false},
      chk_aire_goma:  {type: Boolean, default: false},
      chk_cristal:  {type: Boolean, default: false},
      chk_aspiradora:  {type: Boolean, default: false},
      chk_filtro_aire: {type: Boolean, default: false},
      chk_transmision_description: {type: String},
      chk_liq_hidra_description: {type: String},
      chk_agua_bateria_description: {type: String}
    },
 },
   {timestamps: true},
)

checkoutSchema.plugin(autoIncrement.mongoosePlugin);

const checkoutModel = mongoose.model('checkout', checkoutSchema);

export default checkoutModel;
