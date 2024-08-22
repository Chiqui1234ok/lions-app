import BaseClient from "./BaseClient";

interface BaseUser extends BaseClient {
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