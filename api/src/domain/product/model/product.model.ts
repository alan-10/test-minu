import mongoose, { Schema, Document } from 'mongoose';
import Joi from 'joi';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number
  quantity: number;
}


const ProductSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true,  },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: {type: Number, require: true}
});


const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);


export const userSchemaValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().required(),
  quantity: Joi.number().integer().greater(0).required(),
  price: Joi.number().greater(0).required()
});

export const userSchemaValidationUpdate = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().required(),
  quantity: Joi.number().integer().greater(0).required(),
  price: Joi.number().greater(0).required()
});

export default ProductModel;
