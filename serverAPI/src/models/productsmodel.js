import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongodb-autoincrement';

export const productSchema = new Schema({
    _id: { type: Number },
    name_: { type: String, required: [true, 'El campo nombre es obligatorio'], trim: true },
    model: { type: String, required: [true, 'El campo modelo es obligatorio'], trim: true },
    productType: { type: String, required: [true, 'El tipo de producto es obligatorio'], trim: true },
    api: { type: String, required: [true, 'El tipo de combustible es obligatorio'], trim: true },
    price: { type: String, required: [true, 'Debe colocar el precio'], trim: true },
    eneable: { type: Boolean, default: true }
  },
    { timestamps: true, }
  )

productSchema.plugin(autoIncrement.mongoosePlugin);

const ProductModels = mongoose.model('product', productSchema);

export default ProductModels;
