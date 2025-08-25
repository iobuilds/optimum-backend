import express from 'express';
import helmet from 'helmet';
import path from 'path';
// @ts-ignore
import compression from 'compression';
import cors from 'cors';
import routes from './routes/v1';

import ApiError from './utils/ApiError';
import { errorConverter, errorHandler } from './middlewares/error';
import httpStatus from 'http-status';
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';
import logger from './config/logger';

const app = express();

// set security HTTP headers
app.use(helmet());

app.use(morgan('tiny'));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());
app.use(express.static(path.join(__dirname, 'public')))

// v1 api routes
app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;