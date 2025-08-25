"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var path_1 = __importDefault(require("path"));
// @ts-ignore
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var v1_1 = __importDefault(require("./routes/v1"));
var ApiError_1 = __importDefault(require("./utils/ApiError"));
var error_1 = require("./middlewares/error");
var http_status_1 = __importDefault(require("http-status"));
var morgan_1 = __importDefault(require("morgan"));
var app = (0, express_1.default)();
// set security HTTP headers
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('tiny'));
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// gzip compression
app.use((0, compression_1.default)());
// enable cors
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// v1 api routes
app.use('/api/v1', v1_1.default);
// send back a 404 error for any unknown api request
app.use(function (req, res, next) {
    next(new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
app.use(error_1.errorConverter);
// handle error
app.use(error_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map