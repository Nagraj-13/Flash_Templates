import mongoose from "mongoose";
import Logger from "./logger.config.js";
import APIError from "../utils/apiError.js";
import HttpStatusCode from "../constants/httpStatusCodes.js";

const logger = Logger(import.meta.url);

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("❌ MONGODB_URL is not defined in environment variables!");
        }
        
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
        logger.info(`MongoDB connected! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        logger.error(`MongoDB connection error: ${error.message}`);
        throw new APIError(
            HttpStatusCode.INTERNAL_SERVER_ERROR, 
            "Database connection failed", 
            true
        );
    }
};

export default connectDB;