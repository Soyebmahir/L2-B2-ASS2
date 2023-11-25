import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
router
  .post('/', UserController.createUser)
  .get('/', UserController.getAllUsers)
  .get('/:userId', UserController.getSingleUser)
  .put('/:userId', UserController.updateUserById)
  .delete('/:userId', UserController.deleteUserById)
  .put('/:userId/orders', UserController.addProductInOrders)
  .get('/:userId/orders', UserController.getAllOrdersOfSingleUsers)
  .get(
    '/:userId/orders/total-price',
    UserController.TotalPriceOfOrderForSpecificUser,
  );

export const UserRoutes = router;
