"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = 'ubuntu';
const authenticateToken = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        res.status(401).json({ error: 'Please Sign Up to Continue!' });
        return;
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ error: 'Invalid or expired token' });
            return;
        }
        if (decoded && typeof decoded === 'object') {
            req.user = decoded;
            next();
        }
        else {
            res.status(403).json({ error: 'Invalid token format' });
        }
    });
};
exports.default = authenticateToken;
