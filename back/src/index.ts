import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { logger } from 'hono/logger'
import mongodb from './config/mongodb'
// 🛣 Routes import
import buy from './routes/buy'
import index from './routes/index'
import listing from './routes/listing'
import randomTest from './routes/randomTest'
import sell from './routes/sell'
import user from './routes/user'

const app = new Hono();
app.use('*', logger());
mongodb();

// 🍃 Static files
app.use('/static/*', serveStatic({ root: './' }));
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }));

// 🛣 Routes
app.route('/buy', buy);
app.route('/', index);
app.route('/listing', listing);
app.route('/randomTest', randomTest);
app.route('/sell', sell);
app.route('/user', user);

export default {
  port: Bun.env.DEV_API_PORT, // same as Bun.env.DEV_API_PORT
  fetch: app.fetch,
}
