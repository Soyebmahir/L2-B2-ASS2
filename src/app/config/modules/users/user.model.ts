/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
    TAddress,
    TFullName,
    TOrder,
    TUser,
    UniqueUserModel,
} from './user.interface';
import config from '../..';

const FullNameSchema = new Schema<TFullName>({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
});

const AddressSchema = new Schema<TAddress>({
    street: {
        type: String,
        required: [true, 'Street Name is required'],
        trim: true,
    },
    city: {
        type: String,
        required: [true, 'City Name is required'],
        trim: true,
    },
    country: {
        type: String,
        required: [true, 'Country Name is required'],
        trim: true,
    },
});

const OrderSchema = new Schema<TOrder>({
    productName: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
});

const UserSchema = new Schema<TUser, UniqueUserModel>({
    userId: {
        type: Number,
        required: [true, 'User ID is required'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'User Name is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    fullName: {
        type: FullNameSchema,
        required: [true, 'Name is required'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    hobbies: {
        type: [String],
        required: [true, 'Hobbies are required'],
    },
    address: {
        type: AddressSchema,
        required: [true, 'Address is Required'],
    },
    //   orders: {
    //     type: [OrderSchema],
    //   },
    orders: Schema.Types.Mixed
});

//checking is User already exist
UserSchema.statics.isUserExist = async function (id: number) {
    const existingUser = await Users.findOne({ userId: id });
    return existingUser;
};

//hashing password before save the data to DB
UserSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_round),
    );

    next();
});

export const Users = model<TUser, UniqueUserModel>('Users', UserSchema); //here the uniqueUserModel which is imported from user.interface ,a type of function
