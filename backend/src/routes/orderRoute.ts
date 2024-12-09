import express from 'express';
import { getUserOrderHistory, placeOrderController } from '../controllers/orderController';

const orderRouter = express.Router()

orderRouter.post('/order-placed', placeOrderController);

orderRouter.get('/order-history/:userId', (req, res)=>{
    getUserOrderHistory(req, res)
});


export default orderRouter;