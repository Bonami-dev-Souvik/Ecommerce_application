import express from "express";
import { getProductDetails } from "../controllers/productDetailsController";


const productDetailsRouter = express.Router();

productDetailsRouter.get("/product/:id", (req, res) => {
    getProductDetails(req, res); 
});

export default productDetailsRouter;
