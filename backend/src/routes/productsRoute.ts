import express from 'express';
import { getProducts } from '../controllers/productsController';

const productRouter = express.Router();

productRouter.get('/all-products', getProducts);

export default productRouter;