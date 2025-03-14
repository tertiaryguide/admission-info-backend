"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
exports.SECRET_KEY = JWT_SECRET;
const auth = async (req, res, next) => {
    try {
        console.log(req.header("Authorization"));
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            console.log("missing token");
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
        req.token = decoded;
        next();
    }
    catch (err) {
        res.status(401).send("Please authenticate");
    }
};
exports.auth = auth;
//# sourceMappingURL=middleware.js.map