import config from '../config/config';
import ApiError from '../utils/ApiError';
import { NextFunction, Request, Response } from 'express';

const errorConverter = (err: any, req: Request, res: Response, next: NextFunction): void => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode: number = error.statusCode;
    const message: string = error.message;
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction): void => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    status: false,
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
