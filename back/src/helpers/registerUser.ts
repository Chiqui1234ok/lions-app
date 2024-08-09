import { User } from '../models/User'
// Interfaces
import IMongoUser from '../interfaces/IMongoUser';


const registerUser = async function(data: IMongoUser) {
    const user = new User({
        email: data.email,
        password: data.password,
    });

    // Encrypt password
    const encryptedPassword = await user.encryptPassword(data.password);
    user.password = encryptedPassword;

    await user.save();

    if(!user._id)
        throw new Error('Due a database error, the user can\'t be registered right now.');

    return user;
}

export default registerUser;