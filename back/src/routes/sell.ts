import { Hono } from 'hono'

const sell = new Hono()

sell.get('/', (c) => {
    return c.text('API\'s working')
})

export default sell