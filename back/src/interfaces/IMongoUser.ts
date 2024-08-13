interface IMongoUser extends Document {
    name?: string;
    description: string;
    phone: string;
    email: string;
    password?: string;
    role?: Object;
    thumbnail?: Buffer;
    note: string;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

export default IMongoUser;