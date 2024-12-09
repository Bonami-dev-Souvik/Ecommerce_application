"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const orderRouter = express_1.default.Router();
orderRouter.post('/order-placed', orderController_1.placeOrderController);
orderRouter.get('/order-history/:userId', (req, res) => {
    (0, orderController_1.getUserOrderHistory)(req, res);
});
exports.default = orderRouter;
