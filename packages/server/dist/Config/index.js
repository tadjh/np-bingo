"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_SECRET = exports.SERVER = exports.ORIGIN = exports.PORT = exports.DB_NAME = exports.DB_URL = exports.DB_PASS = exports.DB_USER = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DB_USER = process.env.DB_USER || 'admin';
exports.DB_PASS = process.env.DB_PASS || 'password';
exports.DB_URL = process.env.DB_URL || 'example.com';
exports.DB_NAME = process.env.DB_NAME || 'db';
exports.PORT = process.env.PORT || '80';
exports.ORIGIN = process.env.ORIGIN || 'http://localhost:3000';
exports.SERVER = process.env.SERVER || 'http://localhost:8082';
exports.API_SECRET = process.env.API_SECRET || 'secret';
