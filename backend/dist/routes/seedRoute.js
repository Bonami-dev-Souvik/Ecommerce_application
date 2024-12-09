"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const seed_1 = require("../seed/seed");
const seedRouter = express_1.default.Router();
seedRouter.get('/seed-data', seed_1.main);
exports.default = seedRouter;
