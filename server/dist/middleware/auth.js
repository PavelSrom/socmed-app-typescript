"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
exports.default = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(401).send({ message: 'Missing token' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtSecret'));
        req.userID = decoded.id;
        next();
    }
    catch ({ message }) {
        console.log(message);
        return res.status(403).send({ message: 'Invalid token' });
    }
};
