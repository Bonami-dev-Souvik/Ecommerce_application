"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreCartItemController = exports.removeCartItemController = exports.updateCartItemController = exports.getCartItemsController = exports.addToCartController = void 0;
const cartService = __importStar(require("../services/cartService"));
// to add to a cart
const addToCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: 'User ID, Product ID, and Quantity are required' });
    }
    try {
        const cartItem = yield cartService.addToCart(userId, productId, quantity);
        return res.status(201).json({ message: 'Item added to cart successfully', cartItem });
    }
    catch (error) {
        console.error('Add to cart error:', error);
        return res.status(500).json({ message: 'Error adding item to cart' });
    }
});
exports.addToCartController = addToCartController;
// to get all cart items according to the user
const getCartItemsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        const cartItems = yield cartService.getCartItems(parseInt(userId));
        return res.status(200).json({ cartItems });
    }
    catch (error) {
        console.error('Get cart items error:', error);
        return res.status(500).json({ message: 'Error fetching cart items' });
    }
});
exports.getCartItemsController = getCartItemsController;
// to update the quantity of a cart item
const updateCartItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId, quantity } = req.body;
    if (!cartId || !quantity) {
        return res.status(400).json({ message: 'Cart ID and Quantity are required' });
    }
    try {
        const updatedCartItem = yield cartService.updateCartItem(cartId, quantity);
        return res.status(200).json({ message: 'Cart item updated successfully', updatedCartItem });
    }
    catch (error) {
        console.error('Update cart item error:', error);
        return res.status(500).json({ message: 'Error updating cart item' });
    }
});
exports.updateCartItemController = updateCartItemController;
// to remove or (soft delete) a cart item
const removeCartItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId } = req.body;
    if (!cartId) {
        return res.status(400).json({ message: 'Cart ID is required' });
    }
    try {
        const removedCartItem = yield cartService.removeCartItem(cartId);
        return res.status(200).json({ message: 'Cart item removed successfully', removedCartItem });
    }
    catch (error) {
        console.error('Remove cart item error:', error);
        return res.status(500).json({ message: 'Error removing cart item' });
    }
});
exports.removeCartItemController = removeCartItemController;
// **todo to restore a soft-deleted cart item 
const restoreCartItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId } = req.body;
    if (!cartId) {
        return res.status(400).json({ message: 'Cart ID is required' });
    }
    try {
        const restoredCartItem = yield cartService.restoreCartItem(cartId);
        return res.status(200).json({ message: 'Cart item restored successfully', restoredCartItem });
    }
    catch (error) {
        console.error('Restore cart item error:', error);
        return res.status(500).json({ message: 'Error restoring a cart item' });
    }
});
exports.restoreCartItemController = restoreCartItemController;
