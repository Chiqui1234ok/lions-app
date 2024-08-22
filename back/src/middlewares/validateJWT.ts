import { verify } from 'hono/jwt'
import { createMiddleware } from 'hono/factory'
import BunResponse from '../interfaces/BunResponse';

const validateJWT = createMiddleware(async function(c, next) {
    const token = c.req.header('Authorization');

    let result: BunResponse = {
        success: false,
        data: {},
        message: []
    },
    jwt = null;

    if(token) {
        const splittedAuthorizationString = token.split('Bearer ');
        jwt = await verify(splittedAuthorizationString[1], process.env.DEV_JWT_SECRET);
        
        /**
         *  console.log(jwt) example 
            {
                sub: "santiagogimenez@outlook.com.ar",
                role: 1,
                exp: 1723175898,
            }
         */
        // return decodedPayload;
        next();
    } else {
        console.error(`jwt: ${jwt}`);
        return c.json(result);
    }
});

export default validateJWT;