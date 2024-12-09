import { Request, Response } from 'express';
import * as orderService from '../services/orderService';

export const placeOrderController = async (req: Request, res: Response): Promise<any> => {
  const { userId, addressId } = req.body;

  // ipnut validation
  if (!userId || !addressId) {
    return res.status(400).json({ message: 'User ID and Product ID are required' });
  }

  try {
    //interacting with the service layer for placing orders
    const order = await orderService.placeOrder(userId, addressId);
    return res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserOrderHistory = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId); // Extract userId from request params

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const orders = await orderService.getOrderHistoryByUser(userId);
    return res.status(200).json(orders);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
