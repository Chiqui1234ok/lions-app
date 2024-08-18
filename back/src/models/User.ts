import { Schema, model } from 'mongoose';
import IMongoUser from '../interfaces/User';

const UserSchema = new Schema<IMongoUser>(
    {
        name: { type: String, default: null },
        description: { type: String },
        phone: { type: String },
        email: { type: String },
        password: { type: String },
        role: { type: Map, of: Number },
        thumbnail: { type: Buffer },
        note: { type: String }
    },
    {
        timestamps: true
    }
);

UserSchema.methods.encryptPassword = async function (password: string): Promise<string> {
    return Bun.password.hash(password);
};

UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return Bun.password.verify(password, this.password);
};

const UserModel = model<IMongoUser>('User', UserSchema);

export default UserModel;
