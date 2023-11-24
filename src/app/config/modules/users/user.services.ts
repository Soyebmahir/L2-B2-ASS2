import { TUser } from './user.interface';
import { Users } from './user.model';

const createUserIntoDb = async (user: TUser) => {
    if (await Users.isUserExist(user.userId)) {
        throw new Error('User Already existed');
    }

    const result = await Users.create(user);
    return result;
};

export const StudentServices = {
    createUserIntoDb,
};
