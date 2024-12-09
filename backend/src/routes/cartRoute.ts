import express from "express";
import {
  addToCartController,
  getCartItemsController,
  updateCartItemController,
  removeCartItemController,
  restoreCartItemController,
} from "../controllers/cartController";

const cartRoute = express.Router();

cartRoute.post("/add", addToCartController);

cartRoute.get("/:userId", getCartItemsController);

cartRoute.put("/update", updateCartItemController);

cartRoute.delete("/remove", removeCartItemController);

cartRoute.post("/restore", restoreCartItemController);

export default cartRoute;
