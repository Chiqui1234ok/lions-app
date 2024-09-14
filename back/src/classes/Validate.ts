import { verify } from 'hono/jwt'

/**
 * This class encapsulates all validation's methods
 * 
 * @date 2024-08-22
 * @author Santiago Gimenez
 *
 * @class Validate
 * @typedef {Validate}
 */
class Validate {
    /**
     * Validates any string checking if it's an email
     * 
     * @param {string} email
     * @returns {boolean} True if string contains '@' and '.<something>'.
    */
    public static email(email: string): boolean {
        const   regex = /^[^@]+@[^@]+\.[^@]+$/,
                result: boolean = regex.test(email);
        if(!result)
            throw new Error('This email is invalid.');
        return result;
    }

    public static password(password: string): boolean {
        const result: boolean = password.length >= 8;
        if(!result)
            throw new Error('Password must have 8 characters or more.');
        return result;
    }

    /**
     * Validates a JSON Web Token (JWT).
     * 
     * @param {string} token - The JSON Web Token to validate.
     * @returns {boolean} True if the JWT is valid, otherwise false.
     */
    public static async jwt(token: string) {
        const secret = Bun.env.DEV_JWT_SECRET;
        let jwt = null;
        if(token && secret) {
            const splittedAuthorizationString = token.split('Bearer ');
            jwt = await verify(splittedAuthorizationString[1], secret);
            return jwt;
        }
        // else
        throw new Error('This token is invalid, try to remove your cookies and login again.');
    }
}

export default Validate;