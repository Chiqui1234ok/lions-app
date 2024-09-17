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