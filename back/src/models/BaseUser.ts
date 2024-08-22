import { Schema, model } from 'mongoose';
import { BaseUser } from '../interfaces/BaseUser';
import BaseClientModel from './BaseClient';

const BaseUserSchema = new Schema<BaseUser>(
    {
        ...BaseClientModel,
        password: { type: String },
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
    return Bun.password.verify(password, this.password);
};

const BaseUserModel = model<BaseUser>('User', BaseUserSchema);

export default BaseUserModel;
