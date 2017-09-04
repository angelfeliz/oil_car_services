import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongodb-autoincrement';


 export const customerSchema = new Schema({
   _id: { type: Number },
  firstName: { type: String, required: [true, 'El primer nombre es obligatorio'], trim: true },
  lastName: { type: String, required: [true, 'El apellido es obligatorio'], trim: true },
  phoneNumber: { type: String, required: [true, 'El telefono es obligatorio'], trim: true },
  email: { type: String, trim: true },
  rnc: { type: String, trim: true },
},
{ timestamps: true, }
);

customerSchema.plugin(autoIncrement.mongoosePlugin);

const customerModel = mongoose.model('customer', customerSchema);

export default customerModel
