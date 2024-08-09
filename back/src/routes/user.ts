import { Hono } from 'hono'
import validateUser from '../middlewares/validateUser';
import findUser from '../helpers/findUser';
import registerUser from '../helpers/registerUser';
import validatePassword from '../helpers/validatePassword';
// Interfaces
import IMongoUser from '../interfaces/IMongoUser';
import BunResponse from '../interfaces/BunResponse';
// JWT
import signJWT from '../helpers/signJWT';
import { verify } from 'hono/jwt';

const router = new Hono();

router.get('/', (c) => {
    return c.text('/user');
});

router.post('/register', validateUser, async (c) => {
    let result: BunResponse = {
        success: false,
        data: {},
        message: []
    },
    user = null,
    jwt = null;

    try {
        // 1. Request
        const request = await c.req.json() as IMongoUser;
        // 2. Look into DB for duplicated email
        user = await findUser(request);
        if(user && user._id) {
            throw new Error('This email is already taken. You forgot the password?');
        }
        // 3. Register user
        user = await registerUser(request);
        // 4. Sign user (JWT)
        jwt = await signJWT(user);
        // 5. Verify JWT token
        await verify(jwt, process.env.DEV_JWT_SECRET) ? true : msg.push('Can\'t login you in. Retry in a few seconds.');

        if(user && user._id) {
            result.success = true;
            result.message.push('User registered successfully.');
            result.data = {
                user: {
                    email: user.email,
                    jwt: jwt
                }
            }
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