import responseHandler from "../utils/responseHandler.js";
import Logger from "../config/logger.config.js";

const logger = Logger(import.meta.url);

export const errorHandler = (err, req, res, next) => {
    logger.error(`Unhandled error: ${err.message}`);
    responseHandler.sendError(res, err);
};
