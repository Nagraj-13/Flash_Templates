import HttpStatusCode from "../constants/httpStatusCodes.js";

class BaseError extends Error {
    constructor(httpCode, message, isOperational = true, metaData = {}) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
      this.httpCode = httpCode;
      this.isOperational = isOperational;
      this.metaData = metaData;
      Error.captureStackTrace(this);
    }
}

class APIError extends BaseError {
  constructor(httpCode = HttpStatusCode.INTERNAL_SERVER_ERROR.code || 500, message = "Internal server error", isOperational = true, metaData = {}) {
    super(httpCode, message, isOperational, metaData);
  }
}

export default APIError;
