import { Schema, model } from 'mongoose'
import BaseProduct from '../interfaces/BaseProduct'

const BaseProductSchema = new Schema<BaseProduct>(
    {
        name: { type: String, required: true },
        description: { type: String },
        images: [{ type: Buffer }],
        price: { type: Map, of: Number, required: true },
        stock: { type: Number, required: true },
        sku: { type: String }
    },
    {
        timestamps: true
    }
);

const BaseProductModel = model<BaseProduct>('Product', BaseProductSchema);

export default BaseProductModel;