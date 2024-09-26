// MongoDB
import { Schema, model } from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose'
//
import User from '../classes/User/User';

const schema = getModelForClass(User);

// schema.methods.encryptPassword = async function (password: string): Promise<string> {
//     return Bun.password.hash(password);
// };

// schema.methods.validatePassword = async function (password: string): Promise<boolean> {
//     console.log('validatePassword(password):');
//     console.log(password);
//     return Bun.password.verify(password, this.password);
// };

const MongoUser = model<User>('User', schema);

export default MongoUser;
