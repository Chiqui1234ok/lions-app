import { Hono } from 'hono'
// Classes
import User from '../classes/User';
// Middleware
import validateUser from '../middlewares/validateUser';
// Interfaces
import { BaseUser } from '../interfaces/User';
import { string } from 'zod';
import BunResponse from '../interfaces/BunResponse';

const router = new Hono();

router.get('/', (c) => {
    return c.text('/user');
});

router.post('/register', validateUser, async (c) => {
    let result: BunResponse = {
        success: false,
        data: {},
        message: []
    };
    
    try {
        // 1. Validations over user's input
        const request: BaseUser = await c.req.json();
        if(request.email === undefined && request.password === undefined)
            throw new Error('Invalid email or password.');
        request.name = !!request.name ? request.name : 'Usuario';
        // 2. Register user
        const userInstance = new User();
        const user = userInstance.registerUser(request);

        if(user) {
            result.success = true;
            result.data = user;
            result.message.push('User registered successfully.');
        }
    } catch(err) {
        console.error(err);
        if(err instanceof Error)
            result.message.push(err.message);
        else
            result.message.push('An unknown error appeared.');
    }

    return c.json(result);
});

router.post('/login', validateUser, async (c) => {
    let result: BunResponse = {
        success: false,
        data: {},
        message: []
    };

    try {
        // 1. Validations over user's input
        const request: BaseUser = await c.req.json();
        if(request.email === undefined && request.password === undefined)
            return c.status(400);
        // 2. Find user
        const UserInstance = new User();
        const user = await UserInstance.findUser({field: 'email', query: request.email});
        // 3. Compare user's password with db password
        const validatedPassword = await UserInstance.validatePassword(user);
        // password ok? If so, I can create a JWT
        if(validatedPassword) {
            result.success = true;
            result.data = { user: { jwt: await UserInstance.signUser(user) } };
            result.message.push('User logued in!');
        }
    } catch(err) {
        console.error(err);
        if(err instanceof Error)
            result.message.push(err.message);
        else
            result.message.push('An unknown error happens.');
    }

    return c.json(result);
});

export default router