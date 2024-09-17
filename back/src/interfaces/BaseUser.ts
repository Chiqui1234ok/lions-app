import Password from "../classes/tinyTypes/Password";
import BaseClient from "./BaseClient";

interface BaseUser extends BaseClient {
    password: Password;
    roles?: Map<string, number>;
}

interface FindUser {
    field: string;
    query: string;
}

export { BaseUser, FindUser };