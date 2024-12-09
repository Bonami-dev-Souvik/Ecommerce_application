"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addressController_1 = require("../controllers/addressController");
const addressRoute = express_1.default.Router();
addressRoute.get("/:userId/addresses", addressController_1.getAddresses);
addressRoute.post("/:userId/addresses", addressController_1.createAddress);
addressRoute.put("/:userId/addresses/:addressId", addressController_1.editAddress);
addressRoute.delete("/:userId/addresses/:addressId", addressController_1.removeAddress);
exports.default = addressRoute;
