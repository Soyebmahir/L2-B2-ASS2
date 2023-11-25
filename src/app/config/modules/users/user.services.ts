/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { TOrder, TUser } from './user.interface';
import { Users } from './user.model';

const createUserIntoDb = async (user: TUser) => {
    if (await Users.isUserExist(user.userId)) {
        throw new Error('User Already existed');
    }

    return await Users.create(user);
};

const getAllUsersFromDB = async () => {
    return await Users.find(
        {},
        { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 },
    );
};

const getSingleUserFromDB = async (id: number) => {
    //   return await Users.findOne({ userId: id }).select('-password');
    if (!(await Users.isUserExist(id))) {
        throw new Error('This User not Exist in database');
    }
    return await Users.find({ userId: id }, { password: 0 });
};

const updateUserByIdIntoDB = async (id: number, data: TUser) => {
    if (!(await Users.isUserExist(id))) {
        throw new Error('This User not Exist in database');
    }
    const user = await Users.findOne({ userId: id });
    if (!user) {
        throw new Error('User not found');
    }
    return await user?.set(data).save();
};

const deleteUserFromDb = async (id: number) => {
    if (!(await Users.isUserExist(id))) {
        throw new Error('User with this ID is not Exist in database ');
    }
    return await Users.deleteOne({ userId: id });
};

const addProductInOrderById = async (userId: number, product: TOrder) => {
    if (!(await Users.isUserExist(userId))) {
        throw new Error('User not found');
    }
    return await Users.updateOne(
        { userId },
        { $addToSet: { orders: product } },
        { runValidators: true },
    );
};

const getAllOrdersOfSingleUsersFromDB = async (userId: number) => {
    if (!(await Users.isUserExist(userId))) {
        throw new Error('User Not Found');
    }
    //normal Query
    // return await Users.findOne({ userId }, { _id: 0, orders: 1 })

    //with aggregate
    const result = await Users.aggregate([
        { $match: { userId: userId } },
        // { $unwind: "$orders" },
        { $project: { _id: 0, orders: 1 } },
    ]);

    const [data] = result;
    data.orders = data?.orders?.map(({ _id, ...rest }: { _id: string, rest: TOrder }) => rest);
    return data;
};

const TotalPriceOfOrderForSpecificUserDB = async (userId: number) => {
    if (!(await Users.isUserExist(userId))) {
        throw new Error('User Not Found');
    }
    return await Users.aggregate([
        { $match: { userId: userId } },
        { $unwind: '$orders' },
        {
            $group: {
                _id: null,
                totalPrice: {
                    $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
                },
            },
        },
        { $project: { _id: 0, totalPrice: 1 } },
    ]);
};

export const UserServices = {
    createUserIntoDb,
    getSingleUserFromDB,
    getAllUsersFromDB,
    updateUserByIdIntoDB,
    deleteUserFromDb,
    addProductInOrderById,
    getAllOrdersOfSingleUsersFromDB,
    TotalPriceOfOrderForSpecificUserDB,
};
