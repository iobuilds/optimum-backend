"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var config_1 = __importDefault(require("./config/config"));
var logger_1 = __importDefault(require("./config/logger"));
var cluster_1 = __importDefault(require("cluster"));
var clusters = 2;
var server;
if (cluster_1.default.isMaster) {
    logger_1.default.info("Master ".concat(process.pid, " is running"));
    for (var i = 0; i < clusters; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', function (worker, code, signal) {
        logger_1.default.error("worker ".concat(worker.process.pid, " died"));
    });
}
else {
    server = app_1.default.listen(config_1.default.port, function () {
        logger_1.default.info("Server started on   - http://localhost:".concat(config_1.default.port));
        logger_1.default.info("Swagger Document on - http://localhost:".concat(config_1.default.port, "/api/v1/docs"));
    });
    var exitHandler_1 = function () {
        if (server) {
            server.close(function () {
                logger_1.default.info('Server closed');
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    };
    var unexpectedErrorHandler = function (error) {
        logger_1.default.error(error);
        exitHandler_1();
    };
    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);
    process.on('SIGTERM', function () {
        logger_1.default.info('SIGTERM received');
        if (server) {
            server.close();
        }
    });
}
//# sourceMappingURL=index.js.map