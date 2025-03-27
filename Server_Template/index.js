import dotenv from "dotenv";
import app from "./src/app/app.js"; 
import connectDB from "./src/config/database.config.js";
import Logger from "./src/config/logger.config.js";

dotenv.config('./.env');

const logger = Logger(import.meta.url);

const startServer = async () => {
    try {
        await connectDB(); 
        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            logger.info(`🚀 Server is running on port ${PORT}`);
        });

    } catch (error) {
        logger.error(`❌ Server startup failed: ${error.message}`);
        process.exit(1);  
    }
};


startServer();
