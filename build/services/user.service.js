"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = __importDefault(require("../models/user.model"));
var user_login_session_model_1 = __importDefault(require("../models/user_login_session.model"));
var DefaultResponse_1 = __importDefault(require("../utils/DefaultResponse"));
var logger_1 = __importDefault(require("../config/logger"));
var email_1 = __importDefault(require("../utils/email"));
var emailTemplates_1 = __importDefault(require("../utils/emailTemplates"));
var config_1 = __importDefault(require("./../config/config"));
var user_login = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var result, session, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                result = void 0;
                return [4 /*yield*/, user_model_1.default.user_login(data.email, data.password)];
            case 1:
                result = _a.sent();
                if (!result.status) {
                    return [2 /*return*/, result];
                }
                return [4 /*yield*/, user_login_session_model_1.default.user_login_session_add(result.data.userId, result.data.accessToken, data.ipAddress, data.osName)];
            case 2:
                session = _a.sent();
                if (!session.status) {
                    return [2 /*return*/, session];
                }
                return [2 /*return*/, result];
            case 3:
                err_1 = _a.sent();
                logger_1.default.error(err_1);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 4: return [2 /*return*/];
        }
    });
}); };
var user_add = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                result = void 0;
                return [4 /*yield*/, user_model_1.default.user_add(data.firstName, data.lastName, data.email, data.phoneNumber, data.password, data.role, data.authUserId)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
            case 2:
                err_2 = _a.sent();
                logger_1.default.error(err_2);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 3: return [2 /*return*/];
        }
    });
}); };
var user_edit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                result = void 0;
                return [4 /*yield*/, user_model_1.default.user_edit(data.firstName, data.lastName, data.email, data.phoneNumber, data.password, data.role, data.authUserId, data.id)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
            case 2:
                err_3 = _a.sent();
                logger_1.default.error(err_3);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 3: return [2 /*return*/];
        }
    });
}); };
var user_list = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                result = void 0;
                return [4 /*yield*/, user_model_1.default.user_list()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
            case 2:
                err_4 = _a.sent();
                logger_1.default.error(err_4);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 3: return [2 /*return*/];
        }
    });
}); };
var user_view = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                result = void 0;
                return [4 /*yield*/, user_model_1.default.user_view(data.id)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
            case 2:
                err_5 = _a.sent();
                logger_1.default.error(err_5);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 3: return [2 /*return*/];
        }
    });
}); };
var user_forget_password = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var result, userId, firstName, lastName, tempKey, link, message, response, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                result = void 0;
                return [4 /*yield*/, user_model_1.default.user_view_by_email(data.email)];
            case 1:
                // Get user information
                result = _a.sent();
                if (!result.status) {
                    return [2 /*return*/, result];
                }
                userId = result.data.id;
                firstName = result.data.first_name;
                lastName = result.data.last_name;
                tempKey = Math.floor(100000 + Math.random() * 900000).toString();
                return [4 /*yield*/, user_model_1.default.user_forget_password(tempKey, data.email)];
            case 2:
                // Update temp key
                result = _a.sent();
                if (!result.status)
                    return [2 /*return*/, result];
                link = "".concat(config_1.default.domain, "/change-password/").concat(userId, "/").concat(tempKey);
                message = emailTemplates_1.default.change_password_email("".concat(firstName, " ").concat(lastName), link);
                return [4 /*yield*/, email_1.default.emailSend(data.email, "Set your new password", message)];
            case 3:
                response = _a.sent();
                if (!response) {
                    return [2 /*return*/, DefaultResponse_1.default.errorFormat("202")];
                }
                // Return response
                return [2 /*return*/, result];
            case 4:
                err_6 = _a.sent();
                logger_1.default.error(err_6);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 5: return [2 /*return*/];
        }
    });
}); };
var user_reset_password = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var result, userRole, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                result = void 0;
                return [4 /*yield*/, user_model_1.default.user_reset_password_validation(data.id, data.tempKey)];
            case 1:
                result = _a.sent();
                if (!result.status) {
                    return [2 /*return*/, result];
                }
                userRole = result.data.role;
                return [4 /*yield*/, user_model_1.default.user_reset_password(data.password, data.id, data.tempKey, userRole)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
            case 3:
                err_7 = _a.sent();
                logger_1.default.error(err_7);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    user_login: user_login,
    user_add: user_add,
    user_edit: user_edit,
    user_list: user_list,
    user_view: user_view,
    user_forget_password: user_forget_password,
    user_reset_password: user_reset_password
};
//# sourceMappingURL=user.service.js.map