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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAddress = exports.editAddress = exports.createAddress = exports.getAddresses = void 0;
const addressService_1 = require("../services/addressService");
const getAddresses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    try {
        const addresses = yield (0, addressService_1.getUserAddresses)(userId);
        res.status(200).json(addresses);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch addresses." });
    }
});
exports.getAddresses = getAddresses;
const createAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const addressData = req.body;
    try {
        const address = yield (0, addressService_1.addAddress)(userId, addressData);
        res.status(201).json(address);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create address." });
    }
});
exports.createAddress = createAddress;
const editAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addressId = parseInt(req.params.addressId);
    const userId = parseInt(req.params.userId);
    const addressData = req.body;
    try {
        const updatedAddress = yield (0, addressService_1.updateAddress)(addressId, userId, addressData);
        res.status(200).json(updatedAddress);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update address." });
    }
});
exports.editAddress = editAddress;
const removeAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addressId = parseInt(req.params.addressId);
    try {
        yield (0, addressService_1.deleteAddress)(addressId);
        res.status(200).json({ message: "Address deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete address." });
    }
});
exports.removeAddress = removeAddress;
