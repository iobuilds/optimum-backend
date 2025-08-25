"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var response_json_1 = __importDefault(require("./../json/response.json"));
function success(res, code, data, status) {
    if (code === void 0) { code = '200'; }
    if (data === void 0) { data = ''; }
    if (status === void 0) { status = 200; }
    var responseBody = {
        status: true
    };
    responseBody.code = code;
    // Response message
    var responseMessage = response_json_1.default[code];
    if (responseMessage) {
        responseBody.message = responseMessage;
    }
    else {
        responseBody.message = 'Success'; // Provide a default message if the code is not found
    }
    // Response Data
    if (data != '') {
        responseBody.data = data;
    }
    res.status(status).send(responseBody);
}
function error(res, code, msg, status) {
    if (code === void 0) { code = '200'; }
    if (msg === void 0) { msg = ''; }
    if (status === void 0) { status = 200; }
    var responseBody = {
        status: false
    };
    responseBody.code = code;
    // Response message
    if (code === '000') {
        responseBody.message = msg;
    }
    else {
        var responseMessage = response_json_1.default[code];
        if (responseMessage) {
            responseBody.message = responseMessage;
        }
        else {
            responseBody.message = 'Success'; // Provide a default message if the code is not found
        }
    }
    res.status(status).send(responseBody);
}
function successFormat(code, data) {
    if (code === void 0) { code = '200'; }
    if (data === void 0) { data = ''; }
    var responseBody = {
        status: true
    };
    responseBody.code = code;
    // Response message
    var responseMessage = response_json_1.default[code];
    if (responseMessage) {
        responseBody.message = responseMessage;
    }
    else {
        responseBody.message = 'Success'; // Provide a default message if the code is not found
    }
    // Response Data
    if (data != '') {
        responseBody.data = data;
    }
    return (responseBody);
}
function errorFormat(code, msg, data) {
    if (code === void 0) { code = '200'; }
    if (msg === void 0) { msg = ''; }
    if (data === void 0) { data = ""; }
    var responseBody = {
        status: false
    };
    responseBody.code = code;
    // Response message
    if (code === '000') {
        responseBody.message = msg;
        responseBody.data = data;
    }
    else {
        var responseMessage = response_json_1.default[code];
        if (responseMessage) {
            responseBody.message = responseMessage;
        }
        else {
            responseBody.message = 'Success'; // Provide a default message if the code is not found
        }
    }
    return (responseBody);
}
exports.default = {
    success: success,
    error: error,
    successFormat: successFormat,
    errorFormat: errorFormat
};
//# sourceMappingURL=DefaultResponse.js.map