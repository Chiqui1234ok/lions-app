import * as mongoose from 'mongoose';
import IMongoBusiness from '../interfaces/IMongoBusiness';

const BusinessSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        industry: {
            type: String,
            required: true
        },
        subIndustry: {
            type: String,
            required: true
        },
        thumbnail: {
            type: Buffer,
            default: null
        },
    },
    {
        timestamps: true
    },
);

export const Business = mongoose.model<IMongoBusiness>('Business', BusinessSchema);