import { Schema, model } from 'mongoose';
import IMongoUser from '../interfaces/IMongoUser';

const UserSchema = new Schema(
    {
        // name, description, contact photo, contact info and notes
        name: {
            type: String,
            default: null
        },
        description: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: false
        },
        businessID: [
            {
                type: Schema.ObjectId
            }
        ],
        role: {
            buy: [{
                type: Number
            }],
            calendar: [{
                type: Number
            }],
            calendarGoogle: [{
                type: Number
            }],
            calendarMicrosoft: [{
                type: Number
            }],
            clients: [{
                type: Number
            }],
            emailing: [{
                type: Number
            }],
            sale: [{
                type: Number
            }],
            payment: [{
                type: Number
            }],
            product: [{
                type: Number
            }],
            shipping: [{
                type: Number
            }],
            suppliers: [{
                type: Number
            }],
            stripe: [{
                type: Number
            }],
        },
        thumbnail: {
            type: Buffer,
            required: false
        },
        note: {
            type: String,
            required: false
        }
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
export const User = model<IMongoUser>('User', UserSchema);