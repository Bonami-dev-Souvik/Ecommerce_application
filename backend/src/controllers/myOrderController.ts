import { Request, Response } from "express";
import { getUserOrders } from '../services/myOrdersService';

export const getAllOrdersOfUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId); 
  
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid userId parameter' });
      }
  
      const orders = await getUserOrders(userId);
  
      if (!orders.length) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
  
      return res.status(200).json({ orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
