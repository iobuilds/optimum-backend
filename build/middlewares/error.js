"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
var config_1 = __importDefault(require("../config/config"));
var ApiError_1 = __importDefault(require("../utils/ApiError"));
var errorConverter = function (err, req, res, next) {
    var error = err;
    if (!(error instanceof ApiError_1.default)) {
        var statusCode = error.statusCode;
        var message = error.message;
        error = new ApiError_1.default(statusCode, message, false, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
var errorHandler = function (err, req, res, next) {
    var statusCode = err.statusCode, message = err.message;
    res.locals.errorMessage = err.message;
    var response = __assign({ status: false, code: statusCode, message: message }, (config_1.default.env === 'development' && { stack: err.stack }));
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map