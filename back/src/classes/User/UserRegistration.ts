import Email from "../tinyTypes/Email";
import Password from "../tinyTypes/Password";
import User from "./User";

class UserRegistration {
    public static async register(user: User): Promise<User> {
        // 1. Input validations
        if(user.email === undefined || user.password === undefined)
            throw new Error('Write both email and password.');
        const   validEmail = Email.validate(user.email),
                validPassword = Password.validate(user.password);
        if(!validEmail) throw new Error('Correct your email in order to login.');
        if(!validPassword) throw new Error('Please, your password must have 8 characters or more.').

        // 2. Check user's email is available
        const queryParams: FindUser = {field: 'email', query: user.email};
        let mongoUser = await User.find(queryParams);
        if(mongoUser) throw new Error(`user user already exists, you forgot the password?`);

        // 3. Register new user
        mongoUser = new BaseUserModel({
                        email: user.email,
                        password: '',
                        name: 'Usuario',
                    });
        mongoUser.password = await mongoUser.encryptPassword(user.password);

        // 3.1 Set default roles
        // const userRoles = new Map<string, number>();
        user.role = new Map<string, number>();
        user.role.set('profile', 1);
        // user.role = userRoles;
        
        await mongoUser.save();

        // 4. Throws an error in case user wasn't registered in DB
        if(!mongoUser._id)
            throw new Error('Could\'t save the user due database error. Retry in a few minutes.');

        return mongoUser;
    }
}

export default UserRegistration;