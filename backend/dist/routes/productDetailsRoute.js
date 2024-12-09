"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productDetailsController_1 = require("../controllers/productDetailsController");
const productDetailsRouter = express_1.default.Router();
productDetailsRouter.get("/product/:id", (req, res) => {
    (0, productDetailsController_1.getProductDetails)(req, res);
});
exports.default = productDetailsRouter;
