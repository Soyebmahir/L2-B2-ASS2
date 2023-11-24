import express from 'express';
import { StudentController } from './user.controller';

const router = express.Router();
router.post('/', StudentController.createUser).get('/:userId');

export const UserRoutes = router;
