
import { TUser } from './user.interface';
import { Users } from './user.model';

const createUserIntoDb = async (user: TUser) => {
    if (await Users.isUserExist(user.userId)) {
        throw new Error('User Already existed');
    }

    return await Users.create(user);

};

const getAllUsersFromDB = async () => {
    return await Users.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 })
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
    if (!user) {
        throw new Error('User not found');
    }
    return await user?.set(data).save();

};


const deleteUserFromDb = async (id: number) => {
    if (!await Users.isUserExist(id)) {
        throw new Error('User with this ID is not Exist in database ');
    }
    return await Users.deleteOne({ userId: id })
}

export const UserServices = {
    createUserIntoDb,
    getSingleUserFromDB,
    getAllUsersFromDB,
    updateUserByIdIntoDB,
    deleteUserFromDb
};
