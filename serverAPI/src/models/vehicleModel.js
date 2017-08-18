import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongodb-autoincrement';

const vehicleSchema = new Schema({
  _id: { type: Number },
  customer_id: { type: Number },
  brand: { type: String, required: [true, 'La marca del vehiculo es obligatorio'], trim: true },
  model: { type: String, required: false, trim: true },
  year: { type: String, required: [true, 'El año es obligatorio'], trim: true },
  typeFuel: { type: String, required: [true, 'El tipo de combustible es obligatorio'], trim: true },
  numberPlace: { type: String, required: false, unique: true, },
  km: { type: String },
  nextKm: { type: String },
},
{ timestamps: true, });

vehicleSchema.plugin(autoIncrement.mongoosePlugin);

 const vehicleModel = mongoose.model('vehicle', vehicleSchema);

 export default vehicleModel;
