"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signUpController_1 = require("../controllers/signUpController");
const signUpRouter = express_1.default.Router();
signUpRouter.post('/signUp', signUpController_1.signUpController);
exports.default = signUpRouter;
