"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var config_1 = __importDefault(require("./config"));
var enumerateErrorFormat = (0, winston_1.format)(function (info) {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});
var logger = (0, winston_1.createLogger)({
    level: config_1.default.env === 'development' ? 'debug' : 'info',
    format: winston_1.format.combine(enumerateErrorFormat(), config_1.default.env === 'development' ? winston_1.format.colorize() : winston_1.format.uncolorize(), winston_1.format.splat(), winston_1.format.printf(function (_a) {
        var level = _a.level, message = _a.message;
        return "".concat(level, ": ").concat(message);
    })),
    transports: [
        new winston_1.transports.Console({
            stderrLevels: ['error'],
        }),
        new winston_1.transports.File({ filename: 'logs/warning.log', level: 'warning' }),
        new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'logs/combined.log' }),
    ],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map