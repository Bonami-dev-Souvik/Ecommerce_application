"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const myOrderController_1 = require("../controllers/myOrderController");
const myOrdersRouter = express_1.default.Router();
myOrdersRouter.get('/my-orders/:userId', (req, res) => {
    (0, myOrderController_1.getAllOrdersOfUser)(req, res);
});
exports.default = myOrdersRouter;
