import { Hono } from 'hono'
// Classes
import User from '../classes/User/User';
// Middleware
import validateUser from '../middlewares/validateUser';
// Interfaces
import { BaseUser } from '../interfaces/BaseUser';
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
        // 2. Register user
        const UserInstance = new User();
        UserInstance.email = request.email;
        UserInstance.password = request.password;
        UserInstance.name = !!request.name ? request.name : 'Usuario';
        const user = await UserInstance.registerUser();

        if(user) {
            result.success = true;
            result.data = { user };
            result.message.push('User registered successfully.');
            result.data.jwt = await UserInstance.signUser(user);
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
        // 2. Find user
        const UserInstance = new User();
        const user = await UserInstance.findUser({field: 'email', query: request.email});
        if(!user || !user._id || !user.password) {
            result.message.push('This user doesn\'t exist.');
            return c.json(result);
        }
        // 3. Compare user's password with db password
        const validatedPassword = await user.validatePassword(request.password);
        // password ok? If so, I can create a JWT
        if(validatedPassword) {
            result.success = true;
            result.data = { user: { jwt: await UserInstance.signUser(user) } };
            result.message.push('User logued in!');
        } else {
            result.message.push('Incorrect password.');
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