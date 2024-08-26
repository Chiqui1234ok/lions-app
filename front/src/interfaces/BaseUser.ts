import BaseClient from "./BaseClient";

interface BaseUser extends BaseClient {
    password: string;
    role?: Map<string, number>;
}

interface FindUser {
    field: string;
    query: string;
}

export { BaseUser, FindUser };