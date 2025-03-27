import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Logger from '../config/logger.config.js';
import responseHandler from '../utils/responseHandler.js';
import { errorHandler } from '../middlewares/error.middleware.js';

const logger =  Logger(import.meta.url);
const app = express();

// =========================Middlewares===========================
const configureMiddleware = () => {
    app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(logger.httpLogger); // HTTP Logger (Morgan integrated with Winston)
};

// =========================Routes===============================
const configureRoutes = () => {
    // Catch-all route to handle 404s
    app.use((req, res) => {
        logger.warn(`404 Not Found: ${req.originalUrl}`);
        return responseHandler.sendError(res, {
            message: "Not Found",
            httpCode: 404,
            isOperational: true
        });
    });
    // Add your API routes here
    // app.use('/api/v1', routes);
};

// =========================Error Handlers=======================
const configureErrorHandlers = () => {
    app.use(errorHandler);  // General error handling middleware
};

// =========================App Configuration======================
const configureApp = () => {
    configureMiddleware();
    configureRoutes();
    configureErrorHandlers();
};

// Configure the app before exporting
configureApp();

export default app;
