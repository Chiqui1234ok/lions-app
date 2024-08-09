import { Hono } from 'hono'

const index = new Hono()

index.get('/', (c) => {
    return c.json({ message: 'API\'s working' })
})

export default index