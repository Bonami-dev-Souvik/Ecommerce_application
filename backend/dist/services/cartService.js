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
exports.restoreCartItem = exports.removeCartItem = exports.updateCartItem = exports.getCartItems = exports.addToCart = void 0;
const connection_pool_1 = __importDefault(require("../connection/connection_pool"));
// to increment prodct quantity or add to cart 
const addToCart = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingItem = yield connection_pool_1.default.cart.findFirst({
            where: { userId, productId, removedAt: null },
        });
        if (existingItem) {
            return yield connection_pool_1.default.cart.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        }
        return yield connection_pool_1.default.cart.create({
            data: { userId, productId, quantity },
        });
    }
    catch (error) {
        throw new Error("Error adding to cart: " + error);
    }
});
exports.addToCart = addToCart;
// to get all the active cart items of the user
const getCartItems = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield connection_pool_1.default.cart.findMany({
            where: { userId, removedAt: null },
            include: { product: true },
        });
    }
    catch (error) {
        throw new Error("Error fetching cart: " + error);
    }
});
exports.getCartItems = getCartItems;
// Update cart item quantity
const updateCartItem = (cartId, newQuantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield connection_pool_1.default.cart.update({
            where: { id: cartId },
            data: { quantity: newQuantity },
        });
    }
    catch (error) {
        throw new Error("Error updating cart: " + error);
    }
});
exports.updateCartItem = updateCartItem;
// Soft delete cart item (set removedAt)
const removeCartItem = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield connection_pool_1.default.cart.update({
            where: { id: cartId },
            data: { removedAt: new Date() },
        });
    }
    catch (error) {
        throw new Error("Error removing item from cart: " + error);
    }
});
exports.removeCartItem = removeCartItem;
// **todo later if I want to restore a soft-deleted cart item
const restoreCartItem = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield connection_pool_1.default.cart.update({
            where: { id: cartId },
            data: { removedAt: null },
        });
    }
    catch (error) {
        throw new Error("Error restoring item to cart: " + error);
    }
});
exports.restoreCartItem = restoreCartItem;
