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
        // 1. Get user's input
        const request: BaseUser = await c.req.json();
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
        result.message.push(err.message);
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
        // 1, Request
        const request = await c.req.json() as IMongoUser;
        // 2. Find user
        const user = await findUser(request) as IMongoUser;
        // 3. Compare user's password with db password
        const validatedPassword = await validatePassword(request.password, user);
        // password ok? If so, I can create a JWT
        if(validatedPassword) {
            result.success = true;
            result.data = { user: { jwt: await signJWT(user) } };
            result.message.push('User logued in!');
        }
    } catch(err) {
        console.error(err);
        result.message.push(err.message);
    }

    return c.json(result);
});

export default router