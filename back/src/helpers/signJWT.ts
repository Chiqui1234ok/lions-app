/**
 * Documentation: https://hono.dev/docs/helpers/jwt#payload-validation
 */
import { sign } from 'hono/jwt'
import IMongoUser from '../interfaces/IMongoUser'

const signJWT = async function(data: IMongoUser) {
  const token = await sign(
    {
      sub: data.email,
      role: data.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 300, // Token expires in 300 minutes (5 hours)
    },
    process.env.DEV_JWT_SECRET
  );
  console.log('JWT token:');
  console.log(token);
  return token;
}

export default signJWT;