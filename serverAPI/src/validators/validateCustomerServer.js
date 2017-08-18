import { validateAsync } from '../utils/functions'

const validateCustomerServer = validateAsync({
  _id: { presence: false },
  supervisor: { presence: false },
  totalBruto: { presence: true },
  totalDesc: { presence: false },
  totalItebis: { presence: true },
  /*totalNeto: { type: Number },
  vehicle: {
    vehicle_id: { type: Number, },
    brand: { type: String, },
    numberPlace: { type: String, },
    year: { type: Number, },
    km: { type: Number, },
    nextKm: { type: Number, },
  },
  customer: {
     customer_id: { type: Number },
     email: { type: String },
     firstName: { type: String },
     lastName: { type: String },
     phoneNumber: { type: String },
     rnc: { type: String },
   },
  products: [{
    cuantity: { type: Number },
    itebis: { type: Number },
    name_: { type: String },
    price: { type: Number },
    product_id: { type: Number },
    totalProduct: { type: Number },
    typeProduct: { type: String },
  }],
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
  },*/
});

export default validateCustomerServer
