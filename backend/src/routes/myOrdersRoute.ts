import express from 'express';
import { getAllOrdersOfUser } from '../controllers/myOrderController';

const myOrdersRouter = express.Router();

myOrdersRouter.get('/my-orders/:userId', (req, res) => {
    getAllOrdersOfUser(req, res); 
});

export default myOrdersRouter;


