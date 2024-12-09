"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectedRoute_1 = __importDefault(require("./middlewares/protectedRoute"));
const signUpRoute_1 = __importDefault(require("./routes/signUpRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const productsRoute_1 = __importDefault(require("./routes/productsRoute"));
const seedRoute_1 = __importDefault(require("./routes/seedRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const myOrdersRoute_1 = __importDefault(require("./routes/myOrdersRoute"));
const productDetailsRoute_1 = __importDefault(require("./routes/productDetailsRoute"));
const searchRoute_1 = __importDefault(require("./routes/searchRoute"));
const cartRoute_1 = __importDefault(require("./routes/cartRoute"));
const addressRoute_1 = __importDefault(require("./routes/addressRoute"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/ecommerce_application', signUpRoute_1.default);
app.use('/ecommerce_application', loginRoute_1.default);
app.get('/ecommerce_application/auth-check', protectedRoute_1.default, (req, res) => {
    res.status(200).json({ user: req.user });
});
app.use('/ecommerce_application', protectedRoute_1.default);
app.use('/ecommerce_application', productsRoute_1.default);
app.use('/ecommerce_application', productDetailsRoute_1.default);
app.use('/ecommerce_application', seedRoute_1.default);
app.use('/ecommerce_application', cartRoute_1.default);
app.use('/ecommerce_application', orderRoute_1.default);
app.use('/ecommerce_application', myOrdersRoute_1.default);
app.use('/ecommerce_application', searchRoute_1.default);
app.use('/ecommerce_application', addressRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
