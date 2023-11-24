import express from 'express';
import { StudentController } from './user.controller';

const router = express.Router();
router
    .post('/', StudentController.createUser)
    .get('/:userId', StudentController.getSingleUser);

export const UserRoutes = router;
