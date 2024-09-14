import { createMiddleware } from 'hono/factory';
import Validate from '../classes/Validate';

/**
 * Validates email and password entered by user
 * email should be a valid email
 * The password must be more than 7 characters (minimum of 8)
 */
const validateUser = createMiddleware(async (c, next) => {
    const   userData = await c.req.json(),
            validEmail = Validate.email(userData.email),
            validPassword = Validate.password(userData.password);
    if(validEmail && validPassword) {
        await next();
    } else {
        let message = !validEmail ? 'This email is invalid.' : '';
        message += !validPassword ? ' Password must have 8 characters or more.' : '';
        throw new Error(message);
    }
});

export default validateUser