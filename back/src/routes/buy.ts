import { Hono } from 'hono'
import validateJWT from '../middlewares/validateJWT'
import checkRights from '../middlewares/checkRights';

const buy = new Hono();

buy.get('/', (c) => {
    return c.text('API\'s working');
});

buy.post('/register', validateJWT, async (c) => {
    return c.text('The user has rights');
});

export default buy