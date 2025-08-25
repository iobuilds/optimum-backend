import app from './app';
import config from './config/config';
import logger from './config/logger';
import cluster from 'cluster';
const clusters = 2;

let server: any;

if (cluster.isMaster) {
    logger.info(`Master ${process.pid} is running`);
    for (let i = 0; i < clusters; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        logger.error(`worker ${worker.process.pid} died`);
    });
} else {

    server = app.listen(config.port, () => {
        logger.info(`Server started on   - http://localhost:${config.port}`);
        logger.info(`Swagger Document on - http://localhost:${config.port}/api/v1/docs`);
    });

    const exitHandler = () => {
        if (server) {
            server.close(() => {
                logger.info('Server closed');
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    };

    const unexpectedErrorHandler = (error: Error) => {
        logger.error(error);
        exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);

    process.on('SIGTERM', () => {
        logger.info('SIGTERM received');
        if (server) {
            server.close();
        }
    });

}