/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import userValidationSchema, { orderValidationSchema } from './user.validation';
import { UserServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // Try to parse the user data with Zod schema
    const zodParseUser = userValidationSchema.parse(user);

    const result = await UserServices.createUserIntoDb(zodParseUser);
    const savedUser = await UserServices.getSingleUserFromDB(result.userId);

    // If parsing is successful, send the parsed data in the response
    res.status(200).json({
      success: true,
      message: 'User Created successfully.',
      data: savedUser,
    });
  } catch (error: any) {
    // If parsing fails, handle the error
    if (error instanceof ZodError) {
      // zod validation error
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.errors.map((err) => ({
          code: 404,
          description: err.message,
        })),
      });
    } else {
      // other unexpected Error

      res.status(500).json({
        success: false,
        message: 'User not created',
        error: {
          code: 404,
          description: error.message,
        },
      });
    }
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'All Users Found Successfully.',
      data: result,
    });
  } catch (error: any) {
    //  unexpected Error

    res.status(500).json({
      success: false,
      message: 'Users not Found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User Found Successfully.',
      data: result,
    });
  } catch (error: any) {
    //  unexpected Error

    res.status(500).json({
      success: false,
      message: 'User not Found',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = req.body;
    const result = await UserServices.updateUserByIdIntoDB(
      Number(userId),
      data,
    );
    const savedUser = await UserServices.getSingleUserFromDB(result.userId);
    res.status(200).json({
      success: true,
      message: 'User Updated Successfully.',
      data: savedUser,
    });
  } catch (error: any) {
    //  unexpected Error

    res.status(500).json({
      success: false,
      message: 'User not updated',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserFromDb(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted Successfully.',
      data: null,
    });
  } catch (error: any) {
    //  unexpected Error

    res.status(500).json({
      success: false,
      message: 'User not deleted',
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

const addProductInOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const product = req.body;

    const zodParseProduct = orderValidationSchema.parse(product);

    await UserServices.addProductInOrderById(Number(userId), zodParseProduct);
    res.status(200).json({
      success: true,
      message: 'Order created Successfully.',
      data: null,
    });
  } catch (error: any) {
    //  unexpected Error

    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};
const getAllOrdersOfSingleUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllOrdersOfSingleUsersFromDB(
      Number(req.params.userId),
    );
    res.status(200).json({
      success: true,
      message: 'Orders Found Successfully.',
      data: result,
    });
  } catch (error: any) {
    //  unexpected Error

    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};
const TotalPriceOfOrderForSpecificUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const isOrderExist = await UserServices.getAllOrdersOfSingleUsersFromDB(
      Number(req.params.userId),
    );

    if (isOrderExist?.orders?.length < 1) {
      throw new Error('No product Ordered');
    }

    const result = await UserServices.TotalPriceOfOrderForSpecificUserDB(
      Number(req.params.userId),
    );
    res.status(200).json({
      success: true,
      message: 'Orders Found Successfully.',
      data: result,
    });
  } catch (error: any) {
    //  unexpected Error

    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: error.message,
      },
    });
  }
};

export const UserController = {
  createUser,
  getSingleUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  addProductInOrders,
  getAllOrdersOfSingleUsers,
  TotalPriceOfOrderForSpecificUser,
};
