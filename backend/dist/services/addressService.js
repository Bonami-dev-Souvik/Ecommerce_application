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
exports.deleteAddress = exports.updateAddress = exports.addAddress = exports.getUserAddresses = void 0;
const connection_pool_1 = __importDefault(require("../connection/connection_pool"));
const getUserAddresses = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_pool_1.default.address.findMany({
        where: { userId, isDeleted: false },
        orderBy: { isPrimary: "desc" },
    });
});
exports.getUserAddresses = getUserAddresses;
const addAddress = (userId, addressData) => __awaiter(void 0, void 0, void 0, function* () {
    if (addressData.isPrimary) {
        yield connection_pool_1.default.address.updateMany({
            where: { userId },
            data: { isPrimary: false },
        });
    }
    return yield connection_pool_1.default.address.create({
        data: Object.assign(Object.assign({}, addressData), { userId }),
    });
});
exports.addAddress = addAddress;
const updateAddress = (addressId, userId, addressData) => __awaiter(void 0, void 0, void 0, function* () {
    if (addressData.isPrimary) {
        yield connection_pool_1.default.address.updateMany({
            where: { userId },
            data: { isPrimary: false },
        });
    }
    return yield connection_pool_1.default.address.update({
        where: { id: addressId },
        data: addressData,
    });
});
exports.updateAddress = updateAddress;
const deleteAddress = (addressId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_pool_1.default.address.update({
        where: { id: addressId },
        data: { isDeleted: true }
    });
});
exports.deleteAddress = deleteAddress;
