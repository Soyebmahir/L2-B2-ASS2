import { TUser } from './user.interface';
import { Users } from './user.model';

const createUserIntoDb = async (user: TUser) => {
    if (await Users.isUserExist(user.userId)) {
        throw new Error('User Already existed');
    }

    const result = await Users.create(user);
    return result;
};

const getAllUsersFromDB = async () => {
    return await Users.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1 })
}

const getSingleUserFromDB = async (id: number) => {
    //   return await Users.findOne({ userId: id }).select('-password');
    if (!await Users.isUserExist(id)) {
        throw new Error('This User not Exist in database');
    }
    return await Users.find({ userId: id }, { password: 0 })
};

const updateUserByIdIntoDB = async (id: number, data: TUser) => {
    if (!await Users.isUserExist(id)) {
        throw new Error('This User not Exist in database');
    }
    const user = await Users.findOne({ userId: id });
    const result = await user.set(data).save();
    return result;
};

export const UserServices = {
    createUserIntoDb,
    getSingleUserFromDB,
    getAllUsersFromDB,
    updateUserByIdIntoDB
};
