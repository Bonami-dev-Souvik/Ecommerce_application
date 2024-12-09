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
exports.getOrderHistoryByUser = exports.placeOrder = void 0;
const connection_pool_1 = __importDefault(require("../connection/connection_pool"));
const placeOrder = (userId, addressId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the user exists
        const user = yield connection_pool_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            throw new Error('User not found');
        // Validate the address exists and belongs to the user
        const address = yield connection_pool_1.default.address.findFirst({
            where: { id: addressId, userId, isDeleted: false },
        });
        if (!address)
            throw new Error('Address not found or invalid');
        // Fetch the user's active cart items
        const cartItems = yield connection_pool_1.default.cart.findMany({
            where: { userId, removedAt: null },
            include: { product: true },
        });
        console.log("cart items from backend ", cartItems);
        if (cartItems.length === 0) {
            throw new Error('No items in the cart');
        }
        // Begin a transaction
        const order = yield connection_pool_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            // Loop through cart items and create order entries
            const orderHistories = yield Promise.all(cartItems.map((item) => {
                return prisma.order_history.create({
                    data: {
                        userId,
                        productId: item.productId,
                        address: `${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`,
                        quantity: item.quantity
                    },
                });
            }));
            // Mark cart items as removed
            yield prisma.cart.updateMany({
                where: { userId },
                data: { removedAt: new Date() },
            });
            return orderHistories;
        }));
        return order;
    }
    catch (error) {
        console.error('Error placing order:', error);
        throw new Error('Error placing order: ' + error);
    }
});
exports.placeOrder = placeOrder;
const getOrderHistoryByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield connection_pool_1.default.order_history.findMany({
        where: {
            userId,
        },
        include: {
            product: true, // Include product details
        },
        orderBy: {
            orderDate: 'desc', // Sort orders by most recent first
        },
    });
    if (!orders) {
        throw new Error("No orders found for this user");
    }
    return orders;
});
exports.getOrderHistoryByUser = getOrderHistoryByUser;
