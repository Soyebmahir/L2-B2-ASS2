import { Request, Response } from 'express';
import { ZodError } from 'zod';
import userValidationSchema from './user.validation';
import { StudentServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        // Try to parse the user data with Zod schema
        const zodParseData = userValidationSchema.parse(user);

        const result = await StudentServices.createUserIntoDb(zodParseData);
        const savedUser = await StudentServices.getSingleUserFromDB(result.userId);

        // If parsing is successful, send the parsed data in the response
        res.status(200).json({
            success: true,
            message: 'User Created sucessfully.',
            data: savedUser,
        });
    } catch (error) {

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

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        const result = await StudentServices.getSingleUserFromDB(Number(userId))
        res.status(200).json({
            success: true,
            message: 'User Found Successfully.',
            data: result,
        });

    } catch (error) {

        //  unexpected Error

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


export const StudentController = {
    createUser,
    getSingleUser
};
