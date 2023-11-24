import express from 'express';
import { StudentController } from './user.controller';


const router = express.Router();
router.post('/', StudentController.createUser)

export const UserRoutes = router;