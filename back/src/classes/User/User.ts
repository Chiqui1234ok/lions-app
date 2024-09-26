// NOTE: checks for email and password will be improved. Right now I just setted up like this so the transpiller will not cry ;)
// JWT
import { sign } from 'hono/jwt';
import { verify } from 'hono/jwt'
// Cookie
import { getCookie, setCookie } from 'hono/cookie'
// Context
import { Context } from 'hono';
// Mongoose
import { ObjectId } from 'mongoose';
// Custom code
import Validate from '../Validate';
import Email from '../tinyTypes/Email';
import Password from '../tinyTypes/Password';
import { Name } from '../tinyTypes/Name';
import Phone from '../tinyTypes/Phone';
import { Roles } from '../tinyTypes/Roles';
import Note from '../tinyTypes/Note';
import BaseUserModel from '../../models/MongoUser';
import UserAuthentication from './UserAuthentication';
import UserRegistration from './UserRegistration';
import Client from '../Client/Client';

interface FindUser {
    field: string;
    query: string;
}

class User extends Client {

    constructor(
        protected name: Name,
        protected phone: Phone,
        protected email: Email,
        protected password: Password,
        protected thumbnail: string,
        protected userNotes: Note[],
        protected admNotes: Note[],
        protected roles: Roles,
        protected jwt: string
    ) {
        // Set properties in base class
        super(name, phone, email, password, thumbnail, userNotes, admNotes, roles);
        // Set properties of User class
        this.jwt = jwt;
    }

    
    //
    public setCookies(c: Context): void {
        UserAuthentication.setCookies(c);
    }

    //
    public async register(): Promise<User> {
        return await UserRegistration.register(this);
    }

    public async loginJWT(): Promise<string> {
        return UserAuthentication.loginJWT(this);
    }

    public static async validateJWT(token: string): Promise<boolean> {
        return await UserAuthentication.validateJWT(token);
    }

    // 2. HELPERS
    public static async find(query: FindUser): Promise<User> {
        if(!query || query.field === undefined || query.query === undefined)
            throw new Error('Field or query not specified.');
        
        const queryParams = { [query.field]: query.query };
        const user = await BaseUserModel.findOne(queryParams);
        return user;
    }
}

export default User;