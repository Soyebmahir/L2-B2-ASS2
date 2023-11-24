import { Request, Response } from "express";
import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        // Try to parse the user data with Zod schema
        const zodParseData = userValidationSchema.parse(user);

        // If parsing is successful, send the parsed data in the response
        res.status(200).json({
            data: zodParseData
        });

        console.log(zodParseData);
    } catch (error) {
        // If parsing fails, handle the error
        if (error instanceof zodError) {
            // ZodError contains details about the validation failure
            res.status(400).json({
                error: {
                    message: "Validation failed",
                    details: error.errors.map((err) => ({
                        path: err.path.join('.'),
                        message: err.message
                    }))
                }
            });
        } else {
            // Handle other types of errors (e.g., unexpected errors)
            console.error(error);
            res.status(500).json({
                error: {
                    message: "Internal server error"
                }
            });
        }
    }
};

export const StudentController = {
    createUser,
}