import * as mongoose from 'mongoose';
import IMongoUser from '../interfaces/IMongoUser';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: null
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            default: 1,     // default user
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

UserSchema.methods.encryptPassword = async (password: string) => {
    // '20' is salt's value passes
    return Bun.password.hash(password);
};

UserSchema.methods.validatePassword = async function (password: string) {
    // 'this.password' is hashed password on DB 
    return Bun.password.verify(password, this.password);
};

// export type User = mongoose.InferSchemaType<typeof UserSchema>;
// export const User = mongoose.model('User', UserSchema);
export const User = mongoose.model<IMongoUser>('User', UserSchema);