import { Schema, model } from 'mongoose';
import BaseClient from '../interfaces/BaseClient';
import NoteModel from './Note';

const BaseClientSchema = new Schema<BaseClient>(
    {
        name: { type: String, default: null },
        phone: { type: String },
        email: { type: String },
        thumbnail: { type: Buffer },
        note: [NoteModel]
    },
    {
        timestamps: true
    }
);

const BaseClientModel = model<BaseClient>('Client', BaseClientSchema);

export default BaseClientModel;
