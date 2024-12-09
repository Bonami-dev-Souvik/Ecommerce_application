"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOrders = void 0;
const connection_pool_1 = __importDefault(require("../connection/connection_pool"));
const getUserOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetching orders for the given userId
        const orders = yield connection_pool_1.default.order_history.findMany({
            where: { userId },
            include: {
                product: true,
            },
        });
        return orders;
    }
    catch (error) {
        throw new Error(`Failed to fetch orders: ${error}`);
    }
});
exports.getUserOrders = getUserOrders;
