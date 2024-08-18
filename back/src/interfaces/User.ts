import Client from './Client';

interface BaseUser extends Client {
    password: string;
    role?: Map<string, number>;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

interface FindUser {
    field: string;
    query: string;
}

export { BaseUser, FindUser };