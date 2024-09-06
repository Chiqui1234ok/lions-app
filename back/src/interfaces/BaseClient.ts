import { Document } from 'mongoose';
import Note from './Note';

interface BaseClient extends Document {
    _id?: string;
    name: string; // Defaults to 'User' / 'Usuario'
    phone?: string;
    email?: string;
    thumbnail?: string;
    note?: Note[];
}

export default BaseClient;