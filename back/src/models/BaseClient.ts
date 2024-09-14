import { Schema, model } from 'mongoose';
import BaseClient from '../interfaces/BaseClient';
import { NoteSchema } from './Note';

const BaseClientSchema = new Schema<BaseClient>(
    {
        type: { type: String },
        name: { type: String },
        phone: { type: String },
        email: { type: String },
        thumbnail: { type: Buffer },
        notes: [NoteSchema],
    },
    {
        timestamps: true
    }
);

BaseClientSchema.methods.getId = function() {
    return this._id;
}

BaseClientSchema.methods.getType = function() {
    return this.type;
}

BaseClientSchema.methods.setType = function(type: string) {
    this.type = type;
    this.save();
}

const BaseClientModel = model<BaseClient>('Client', BaseClientSchema);

export { BaseClientSchema, BaseClientModel };
