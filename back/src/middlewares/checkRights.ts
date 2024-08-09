/**
 * Documentation: https://hono.dev/docs/guides/middleware
 */

// import { Hono } from 'hono'
import { createMiddleware } from 'hono/factory'

// const app = new Hono();

const checkRights = createMiddleware(async (c, next) => {
    if(3 > 2)
        await next();
    else {
        const res = {
            success: false,
            data: {},
            msg: 'Invalid role for this user'
        };
        console.log(res);
        return c.json(res);
    }
});

export default checkRights;