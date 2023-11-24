import { z } from 'zod';

const userFullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name must be at least 1 character long' })
    .trim(),
  lastName: z
    .string()
    .min(1, { message: 'Last name must be at least 1 character long' })
    .trim(),
});
const addressValidationSchema = z.object({
  street: z
    .string()
    .trim()
    .min(1, { message: 'Street name must be at least 1 character long' }),
  city: z
    .string()
    .trim()
    .min(1, { message: 'City name must be at least 1 character long' }),
  country: z
    .string()
    .trim()
    .min(1, { message: 'Country name must be at least 1 character long' }),
});

const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});
const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: userFullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  hobbies: z.array(z.string()).min(1, 'Hobbies are required'),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});
export default userValidationSchema;
