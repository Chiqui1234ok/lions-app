import * as mongoose from 'mongoose'

const mongodb = async () => {
    await mongoose.connect(process.env.DEV_MONGODB_URL, {})
    .then(db => console.log(`Connected to ${process.env.DEV_MONGODB_URL}`))
    .catch(err => console.log(err));

    mongoose.set('debug', process.env.ENV == 'dev' ? true : false);
}

export default mongodb;