import { User } from '../models/User'
// Interfaces
import IMongoUser from '../interfaces/IMongoUser';

const findUser = async function(data: IMongoUser) {
    const user = await User.findOne({email: data.email});
    return user;
}

export default findUser;