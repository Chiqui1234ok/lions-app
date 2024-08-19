import mongoose from 'mongoose'

const mongodb = async () => {
    if(process.env.DEV_MONGODB_URL === undefined)
        throw new Error('Invalid MongoDB connection.');
    await mongoose.connect(`${process.env.DEV_MONGODB_URL}`, {})
    .then(db => console.log(`Connected to ${process.env.DEV_MONGODB_URL}`))
    .catch((err:any) => console.log(err));

    mongoose.set('debug', process.env.ENV == 'dev' ? true : false);
}

export default mongodb;