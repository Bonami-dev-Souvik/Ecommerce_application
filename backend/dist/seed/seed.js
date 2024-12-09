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
exports.main = main;
const connection_pool_1 = __importDefault(require("../connection/connection_pool"));
const axios_1 = __importDefault(require("axios"));
function main(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data: products } = yield axios_1.default.get("https://fakestoreapi.com/products");
            const mappedProducts = products.map((product) => ({
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                ratingRate: product.rating.rate,
                ratingCount: product.rating.count,
            }));
            yield connection_pool_1.default.product.createMany({
                data: mappedProducts,
                // skipDuplicates: true, // this Avoids inserting duplicates if the script is re-run
            });
            console.log("Seeding completed successfully!");
            res.status(200).json(products);
        }
        catch (error) {
            console.error("Error seeding the database:", error);
            res.status(500).json({ message: "Internal server error" });
        }
        finally {
            yield connection_pool_1.default.$disconnect();
        }
    });
}
