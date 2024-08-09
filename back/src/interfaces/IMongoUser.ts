interface IMongoUser extends Document {
    name?: string;
    email: string;
    password: string;
    role?: number;
    thumbnail?: Buffer;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

export default IMongoUser;