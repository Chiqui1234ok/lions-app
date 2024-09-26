// MongoDB
import { Schema, model } from 'mongoose';
//
import User from '../classes/User/User';

const schema = new Schema();
schema.loadClass(User);

const MongoUser = model('User', schema);

export default MongoUser;
