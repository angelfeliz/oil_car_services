import  { productSchema } from './productsmodel';
import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongodb-autoincrement';


export const generalServicesSchema = new Schema({
  _id: { type: Number },
  statu: { type: String },
  totalBruto: { type: Number },
  totalDesc: { type: Number },
  totalItebis: { type: Number },
  totalNeto: { type: Number },
  paymentType: { type: String },
  branchOffice: { type: String },
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
 },
   {timestamps: true},
)

generalServicesSchema.plugin(autoIncrement.mongoosePlugin);

const generalServicesModel = mongoose.model('generalServices', generalServicesSchema);

export default generalServicesModel;
