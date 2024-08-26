// NOTE: checks for email and password will be improved. Right now I just setted up like this so the transpiller will not cry ;)

import BaseUserModel from '../models/BaseUser';
import { BaseUser, FindUser } from '../interfaces/BaseUser';
// JWT
import { sign } from 'hono/jwt';

class User {
    /**
     * 
     * @param data BaseUser
     * @returns 
     */
    public async registerUser(data: Omit<BaseUser, 'encryptPassword' | 'validatePassword'>) {
        // 1. Input validations
        if(data.email === undefined)
            throw new Error('email must be defined');

        // 2. Check user's email is available
        const queryParams: FindUser = {field: 'email', query: data.email};
        let user = await this.findUser(queryParams);
        if(user)
            throw new Error(`This email already exists, you forgot the password?`);

        // 3. Register new user
        user =  new BaseUserModel({
                    email: data.email,
                    password: '',
                    name: 'Usuario',
                });
        user.password = await user.encryptPassword(data.password);
        // Set default roles
        const userRoles = new Map<string, number>();
        userRoles.set('profile', 1);
        user.role = userRoles;
        
        await user.save();

        // 4. Throws an error in case user wasn't registered in DB
        if(!user._id)
            throw new Error('Could\'t save the user due database error. Retry in a few minutes.');

        return user;
    }

    public async signUser(data: BaseUser) {
        if(data.email === undefined || data.role === undefined)
            throw new Error('Please, send a valid user data.');
        if(Bun.env.DEV_JWT_SECRET === undefined)
            throw new Error('Sign service isn\'t working right now. Please, try in a few minutes.');
        
        const tokenData = {
            sub: data.email,
            role: data.role,
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