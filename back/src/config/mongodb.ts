import mongoose from 'mongoose'

const mongodb = async () => {
    if(Bun.env.DEV_MONGODB_URL === undefined)
        throw new Error('Invalid MongoDB connection.');
    await mongoose.connect(`${Bun.env.DEV_MONGODB_URL}`, {})
    .then(db => console.log(`Connected to ${Bun.env.DEV_MONGODB_URL}`))
    .catch((err:any) => console.log(err));

    mongoose.set('debug', Bun.env.ENV == 'dev' ? true : false);
}

export default mongodb;