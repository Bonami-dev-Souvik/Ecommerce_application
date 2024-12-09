"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const cartRoute = express_1.default.Router();
cartRoute.post("/add", cartController_1.addToCartController);
cartRoute.get("/:userId", cartController_1.getCartItemsController);
cartRoute.put("/update", cartController_1.updateCartItemController);
cartRoute.delete("/remove", cartController_1.removeCartItemController);
cartRoute.post("/restore", cartController_1.restoreCartItemController);
exports.default = cartRoute;
