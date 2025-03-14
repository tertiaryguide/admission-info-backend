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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.createAdmin = void 0;
const admin_model_1 = require("./admin.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const getErrorMessage_1 = require("utils/getErrorMessage");
const JWT_SECRET = process.env.JWT_SECRET;
// Create admin
const createAdmin = async (req, res, next) => {
    try {
        const { data } = req.body;
        if (!data) {
            res.status(400).json({ message: "data are required" });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const admin = await admin_model_1.AdminModel.create({
            ...data,
            password: hashedPassword,
        });
        const token = jwt.sign({ id: admin._id?.toString() }, JWT_SECRET, {
            expiresIn: "30 days",
        });
        res
            .status(200)
            .json({ message: "Admin created successfully", token: token });
    }
    catch (error) {
        res.status(500).send((0, getErrorMessage_1.getErrorMessage)(error));
    }
};
exports.createAdmin = createAdmin;
const loginAdmin = async (req, res, next) => {
    try {
        const { data } = req.body;
        if (!data) {
            res.status(400).json({ message: "data are required" });
            return;
        }
        const admin = await admin_model_1.AdminModel.findOne({ email: data.email });
        if (!admin) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const passwordsMatch = await bcrypt_1.default.compareSync(data.password, admin.password);
        if (passwordsMatch) {
            const token = jwt.sign({ id: admin._id?.toString() }, JWT_SECRET, {
                expiresIn: "30 days",
            });
            res
                .status(200)
                .json({ message: "Admin logged in successfully", token: token });
        }
        else {
            throw new Error("Passwords do not match");
        }
    }
    catch (error) {
        res.status(500).send((0, getErrorMessage_1.getErrorMessage)(error));
    }
};
exports.loginAdmin = loginAdmin;
//# sourceMappingURL=admin.controller.js.map