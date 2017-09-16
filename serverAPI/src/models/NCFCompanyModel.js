import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongodb-autoincrement';

export const NCFCompanySchema = new Schema({
    _id: { type: Number },
    companyId: { type: Number },
    NCFType: { type: Number },
    Description: { type: String },
    NCF: { type: String, required: false, trim: false },
    actualNCF: { type: Number, required: false },
    inicialNCF: { type: Number, required: false },
    finalNCF: { type: Number, required: false },
    eneable: { type: Boolean, default: true }
  },
    { timestamps: true, }
  )

NCFCompanySchema.plugin(autoIncrement.mongoosePlugin);

const NCFCompanyModels = mongoose.model('NCFCompany', NCFCompanySchema);

export default NCFCompanyModels;
