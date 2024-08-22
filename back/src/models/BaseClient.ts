import { Schema, model } from 'mongoose';
import BaseClient from '../interfaces/BaseClient';
import { NoteSchema } from './Note';

const BaseClientSchema = new Schema<BaseClient>(
    {
        name: { type: String },
        phone: { type: String },
        email: { type: String },
        thumbnail: { type: Buffer },
        note: [NoteSchema],
    },
    {
        timestamps: true
    }
);

const BaseClientModel = model<BaseClient>('Client', BaseClientSchema);

export { BaseClientSchema, BaseClientModel };
