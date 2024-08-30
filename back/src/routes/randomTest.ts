import { Hono } from 'hono'

const randomTest = new Hono()

randomTest.get('/typeof_c', (c) => {
    return c.json({type_of_c: typeof c});
});

randomTest.get('typeof_header', (c) => {
    return c.json({type_of_header: typeof c.req.header});
});

export default randomTest;