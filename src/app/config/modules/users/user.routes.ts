import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
router
    .post('/', UserController.createUser)
    .get('/', UserController.getAllUsers)
    .get('/:userId', UserController.getSingleUser)
    .put('/:userId', UserController.updateUserById)
    .delete('/:userId', UserController.deleteUserById)

export const UserRoutes = router;
