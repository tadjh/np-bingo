import dotenv from 'dotenv';
dotenv.config();

export const DB_USER = process.env.DB_USER || 'admin';
export const DB_PASS = process.env.DB_PASS || 'password';
export const DB_URL = process.env.DB_URL || 'example.com';
export const DB_NAME = process.env.DB_NAME || 'db';
export const PORT = process.env.PORT || '80';
export const ORIGIN = process.env.ORIGIN || 'http://localhost:3000';
export const SERVER = process.env.SERVER || 'http://localhost:8082';
export const API_SECRET = process.env.API_SECRET || 'secret';
