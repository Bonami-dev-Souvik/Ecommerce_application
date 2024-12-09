import express from 'express';
import { searchProducts } from '../controllers/searchController';

const searchRouter = express.Router();

searchRouter.get('/search', (req, res) => {
    searchProducts(req, res); 
});

export default searchRouter;
