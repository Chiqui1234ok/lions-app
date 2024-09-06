// NOTE: checks for email and password will be improved. Right now I just setted up like this so the transpiller will not cry ;)

import BaseUserModel from '../models/BaseUser';
import { BaseUser, FindUser } from '../interfaces/BaseUser';
// JWT
import { sign } from 'hono/jwt';
import { getCookie, setCookie } from 'hono/cookie'
import { Context } from 'hono';
import Validate from './Validate';
import Note from '../interfaces/Note';

class User implements BaseUser {
    
    constructor(
        private _id?: string,
        private name?: string,
        private phone?: string,
        private email?: string,
        private thumbnail?: string,
        private note?: Note[],
        private password?: string,
        private role?: Map<string, number>
    ) {}

    /**
     * registerUserCookies(c) will save user's email in
     * a cookie. With this cookie, back-end can select the
     * database for this user.
     * @param c Hono's Context (I need it for cookie creation)
     * @returns true if all is ok. Otherwise will throw an error which needs to be handle by try/catch blocks
     */
    public registerUserCookies(c: Context): boolean {
        if(c === undefined)
            throw new Error('The context of the application isn\'t OK. Don\'t worry, try again.');
        if(this.email === undefined)
            throw new Error('Please, try to logout and login again.');

        const   check = new Validate(),
                validUser = check.email(this.email);

        if(validUser) {
            this.email = this.email.replace('@', '_');
            setCookie(c, this.email, this.email);
        }
        const checkCookie = getCookie(c, `${this.email}`);
        if(checkCookie === undefined)
            throw new Error('Your data is safe, but we can\'t fetch it right now. Please, try in a minute.');

        // If we're all ok
        return true;
    }

    /**
     * 
     * @param data BaseUser
     * @returns 
     */
    public async registerUser() {
        // 1. Input validations
        if(this.email === undefined)
            throw new Error('Your email must be defined.');
        if(this.password === undefined)
            throw new Error('Write a password for your account.');

        // 2. Check user's email is available
        const queryParams: FindUser = {field: 'email', query: this.email};
        let mongoUser = await this.findUser(queryParams);
        if(mongoUser)
            throw new Error(`This user already exists, you forgot the password?`);

        // 3. Register new user
        mongoUser =  new BaseUserModel({
                    email: this.email,
                    password: '',
                    name: 'Usuario',
                });
        mongoUser.password = await mongoUser.encryptPassword(this.password);

        // 3.1 Set default roles
        // const userRoles = new Map<string, number>();
        this.role = new Map<string, number>();
        this.role.set('profile', 1);
        // user.role = userRoles;
        
        await mongoUser.save();

        // 4. Throws an error in case user wasn't registered in DB
        if(!mongoUser._id)
            throw new Error('Could\'t save the user due database error. Retry in a few minutes.');

        return mongoUser;
    }

    public async signUser() {
        if(this.email === undefined)
            throw new Error('Invalid email.');
        if(this.password === undefined)
            throw new Error('Invalid password.');
        if(this.role === undefined)
            throw new Error('Please, send a valid user data. Try to login again.');
        if(Bun.env.DEV_JWT_SECRET === undefined)
            throw new Error('Login service isn\'t working right now. Please, try in a few minutes.');
        
        const tokenData = {
            sub: this.email,
            role: this.role,
            exp: Math.floor(Date.now() / 1000) * 60 * 300, // Token expires in 300 minutes (5 hours)
        };
        const token = await sign(tokenData, Bun.env.DEV_JWT_SECRET);
        
        return token;
    }

    // 2. HELPERS
    public async findUser(query: FindUser) {
        if(!query || query.field === undefined || query.query === undefined)
            throw new Error('Field or query not specified.');
        
        const queryParams = { [query.field]: query.query };
        const user = await BaseUserModel.findOne(queryParams);
        return user;
    }

    public async validatePassword(data: BaseUser) {
        if(data.password === undefined)
            throw new Error('The password is empty');
        return await data.validatePassword(data.password);
    }
}

export default User;