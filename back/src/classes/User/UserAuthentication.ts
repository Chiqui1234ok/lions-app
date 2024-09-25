import { sign, verify } from "hono/jwt";
import User from "./User";
import { Context } from "hono";

class UserAuthentication {
    public static async loginJWT(user: User): Promise<string> {
        if(user.email === undefined)
            throw new Error('Invalid email.');
        if(user.password === undefined)
            throw new Error('Invalid password.');
        if(user.role === undefined)
            throw new Error('Please, send a valid user data. Try to login again.');
        if(Bun.env.DEV_JWT_SECRET === undefined)
            throw new Error('Login service isn\'t working right now. Please, try in a few minutes.');
        
        const tokenData = {
            sub: user.email,
            role: user.roles,
            exp: Math.floor(Date.now() / 1000) * 60 * 300, // Token expires in 300 minutes (5 hours)
        };
        const token = await sign(tokenData, Bun.env.DEV_JWT_SECRET);
        
        return token;
    }

    /**
     * Validates a JSON Web Token (JWT).
     * 
     * @param {string} token - The JSON Web Token to validate.
     * @returns {boolean} True if the JWT is valid, otherwise false.
     */
    public static async validateJWT(token: string): Promise<boolean> {
        const secret = Bun.env.DEV_JWT_SECRET;
        let jwt: boolean = false;
        if(token && secret) {
            const splittedAuthorizationString = token.split('Bearer ');
            jwt = await verify(splittedAuthorizationString[1], secret) ? true : false;
        }
        // else
        return jwt;
    }

    /**
     * setCookies(c) will save user's email in
     * a cookie. With this cookie, back-end can select the
     * database for this user.
     * @param c Hono's Context (I need it for cookie creation)
     * @returns true if all is ok. Otherwise will throw an error which needs to be handle by try/catch blocks
     */
    public static setCookies(c: Context): void {
        if(c === undefined)
            throw new Error('The context of the application isn\'t OK. Don\'t worry, try again.');
        if(this.email === undefined || this.password.)
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
}

export default UserAuthentication;