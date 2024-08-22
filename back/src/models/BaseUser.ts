import { Schema, model } from 'mongoose';
import { BaseUser } from '../interfaces/BaseUser';
import { NoteSchema } from './Note';

const BaseUserSchema = new Schema<BaseUser>(
    {
        name: { type: String },
        phone: { type: String },
        email: { type: String },
        password: { type: String },
        thumbnail: { type: Buffer },
        note: [NoteSchema],
        role: { type: Map, of: Number },
    },
    {
        timestamps: true
    }
);

BaseUserSchema.methods.encryptPassword = async function (password: string): Promise<string> {
    return Bun.password.hash(password);
};

BaseUserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    console.log('validatePassword(password):');
    console.log(password);
    return Bun.password.verify(password, this.password);
};

const BaseUserModel = model<BaseUser>('User', BaseUserSchema);

export default BaseUserModel;
