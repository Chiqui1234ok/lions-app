import { createMiddleware } from 'hono/factory';
import { z } from 'zod'
// Interface
import BunResponse from '../interfaces/BunResponse';

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(7), // more than 7 chars
});

/**
 * Validates email and password entered by user
 * email should be a valid email
 * The password must be more than 7 characters (minimum of 8)
 */
const validateUser = createMiddleware(async (c, next) => {
    const userData = await c.req.json();
    let userValidation = userSchema.safeParse(userData),
    result: BunResponse = {
        success: false,
        data: {},
        message: []
    };

    if(userValidation.success) {
        await next();
    } else {
        console.log(userValidation);
        for(let i = 0;i < userValidation.error.issues.length;i++) {
            result.message.push(`${userValidation.error.issues[i]?.path[0]} is required`);
        }
        return c.json(result);
    }
});

export default validateUser