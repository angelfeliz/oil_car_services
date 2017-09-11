import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongodb-autoincrement';

export const companySchema = new Schema({
    _id: { type: Number },
    companyName: { type: String, required: [true, 'El campo nombre es obligatorio'], trim: true },
    group: { type: String, required: [true, 'El campo grupo es obligatorio'], trim: true },
    branch: { type: Number, required: [true, 'El campo grupo es obligatorio'], trim: true },
    NCF: { type: String, required: false, trim: false },
    actualNCF: { type: String, required: false, trim: true },
    inicialNCF: { type: String, required: false, trim: true },
    finalNCF: { type: String, required: false, trim: true },
    logo: { type: Buffer, required: false, trim: true },
    eneable: { type: Boolean, default: true }
  },
    { timestamps: true, }
  )

companySchema.plugin(autoIncrement.mongoosePlugin);

const companyModels = mongoose.model('company', companySchema);

export default companyModels;
