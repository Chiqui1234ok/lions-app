import IMongoUser from "../interfaces/IMongoUser";

const validatePassword = async function(inputPassword: string, user: IMongoUser) {
    return await user.validatePassword(inputPassword);
}

export default validatePassword;