import HttpStatusCode from "../constants/httpStatusCodes.js";

const responseHandler = {
    sendSuccess: (
        res,
        data = {},
        message = "Success",
        statusCode = HttpStatusCode.OK.code
    ) => {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    },

    sendError: (res, error) => {
        const isOperational =
            error instanceof BaseError ? error.isOperational : false;
        const statusCode =
            error.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR.code;
        const message = isOperational ? error.message : "Internal server error";

        const response = {
            success: false,
            error: {
                message,
                isOperational,
                httpCode: statusCode,
            },
        };

        if (error.metaData?.errors) {
            response.error.errors = error.metaData.errors;
        }

        res.status(statusCode).json(response);
    },
};

export default responseHandler;
