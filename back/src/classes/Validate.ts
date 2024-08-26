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
    email(email: string): boolean {
        const regex = /^[^@]+@[^@]+\.[^@]+$/;
        return regex.test(email);
    }

    /**
     * Validates a JSON Web Token (JWT).
     * 
     * @param {string} token - The JSON Web Token to validate.
     * @returns {boolean} True if the JWT is valid, otherwise false.
     */
    public async jwt(token: string) {
        const secret = Bun.env.DEV_JWT_SECRET;
        let jwt = null;
        if(token && secret) {
            const splittedAuthorizationString = token.split('Bearer ');
            jwt = await verify(splittedAuthorizationString[1], secret);
            return jwt;
        }
        console.error(`jwt: ${jwt}`);
        return jwt;
    }
}

export default Validate;