import { Hono } from 'hono'

const listing = new Hono()

listing.get('/', (c) => {
    return c.text('API\'s working')
})

export default listing