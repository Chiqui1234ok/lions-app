import { Document } from 'mongoose';

interface Client extends Document {
    name: string; // Defaults to 'User' / 'Usuario'
    description?: string;
    phone?: string;
    email?: string;
    thumbnail?: Buffer;
    note?: string;
}

export default Client;