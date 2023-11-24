import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrder, TUser } from './user.interface';

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

const UserSchema = new Schema<TUser>({
    userId: {
        types: Number,
        required: [true, 'User ID is required'],
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
    orders: {
        type: [OrderSchema],
    },
});

export const Users = model<TUser>('Users', UserSchema)
