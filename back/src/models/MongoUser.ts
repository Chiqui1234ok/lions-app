// MongoDB
import { Schema, model } from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose'
//
import User from '../classes/User/User';
import Note from '../classes/tinyTypes/Note';
import { Role } from '../classes/tinyTypes/Role';
import { Name } from '../classes/tinyTypes/Name';
import Phone from '../classes/tinyTypes/Phone';

const schema = new Schema<User>(
    {
        name: { 
            type: Name
        },
        phone: { 
            type: Phone
        },
        email: { 
            type: String
        },
        password: { 
            type: String
        },
        thumbnail: { 
            type: String
        },
        userNotes: [{
            type: Note

        }],
        admNotes: [{
            type: Note
        }],
        roles: [{
            type: Role
        }],
    },
    {
        timestamps: true
    }
);

schema.methods.encryptPassword = async function (password: string): Promise<string> {
    return Bun.password.hash(password);
};

schema.methods.validatePassword = async function (password: string): Promise<boolean> {
    console.log('validatePassword(password):');
    console.log(password);
    return Bun.password.verify(password, this.password);
};

const MongoUser = model<User>('User', schema);

export default MongoUser;
