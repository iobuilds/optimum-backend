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
var bcrypt_1 = __importDefault(require("bcrypt"));
var config_1 = __importDefault(require("./../config/config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var db_1 = __importDefault(require("../config/db"));
var logger_1 = __importDefault(require("../config/logger"));
var DefaultResponse_1 = __importDefault(require("../utils/DefaultResponse"));
var luxon_1 = require("luxon");
var user_login = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var hashPassword, result, accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcrypt_1.default.hash(password, config_1.default.pass_salt)];
            case 1:
                hashPassword = _a.sent();
                console.log("🚀 ~ constuser_login= ~ hashPassword:", hashPassword);
                return [4 /*yield*/, db_1.default.query('SELECT user.id, user.role FROM user WHERE user.email = ? && user.password = ? && user.status = 1', [email, hashPassword])];
            case 2:
                result = _a.sent();
                console.log(result);
                // If error in sql query
                if (!result.status) {
                    return [2 /*return*/, result];
                }
                // If wrong password
                if (result.data.length === 0) {
                    return [2 /*return*/, DefaultResponse_1.default.errorFormat('001')];
                }
                accessToken = jsonwebtoken_1.default.sign({ user: result.data[0].id, role: result.data[0].role }, config_1.default.jwt_access_key, {
                    expiresIn: parseInt(config_1.default.jwt_a_max_age),
                });
                return [2 /*return*/, DefaultResponse_1.default.successFormat("200", {
                        accessToken: accessToken,
                        role: result.data[0].role,
                        userId: result.data[0].id
                    })];
        }
    });
}); };
var user_add = function (firstName, lastName, email, phoneNumber, password, role, authUserId) { return __awaiter(void 0, void 0, void 0, function () {
    var hashPassword, currentDateTime, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, bcrypt_1.default.hash(password, config_1.default.pass_salt)];
            case 1:
                hashPassword = _a.sent();
                currentDateTime = luxon_1.DateTime.now().setZone("Asia/Colombo").toFormat("y-MM-dd HH:mm:ss");
                return [4 /*yield*/, db_1.default.query('INSERT INTO `user`(first_name, last_name, email, phone_number, password, role, status, added_by, added_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, email, phoneNumber, hashPassword, role, 1, authUserId, currentDateTime])];
            case 2:
                result = _a.sent();
                if (result.status) {
                    return [2 /*return*/, DefaultResponse_1.default.successFormat("200", {
                            insertId: result.data.insertId
                        })];
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
var user_edit = function (firstName, lastName, email, phoneNumber, password, role, authUserId, id) { return __awaiter(void 0, void 0, void 0, function () {
    var currentDateTime, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                currentDateTime = luxon_1.DateTime.now().setZone("Asia/Colombo").toFormat("y-MM-dd HH:mm:ss");
                return [4 /*yield*/, db_1.default.query('UPDATE `user` SET first_name = ?, last_name = ?, email = ?, phone_number = ?,  role = ?, updated_by = ?, updated_time = ? WHERE id = ? ', [firstName, lastName, email, phoneNumber, role, authUserId, currentDateTime, id])];
            case 1:
                result = _a.sent();
                if (result.status) {
                    return [2 /*return*/, DefaultResponse_1.default.successFormat("200")];
                }
                return [2 /*return*/, result];
            case 2:
                err_2 = _a.sent();
                logger_1.default.error(err_2);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 3: return [2 /*return*/];
        }
    });
}); };
var user_list = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.query("SELECT user.id, user.first_name, user.last_name, user.email, user.phone_number,  user.role, user.status, user.added_by, DATE_FORMAT(user.added_time, '%Y-%m-%d %H:%i:%s') AS added_time, user.updated_by, DATE_FORMAT(user.updated_time, '%Y-%m-%d %H:%i:%s') AS updated_time\n        FROM user\n        INNER JOIN user_role ON user_role.id = user.role ORDER BY user.id DESC", [])];
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
var user_view = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.query("SELECT user.id, user.first_name, user.last_name, user.email, user.phone_number,  user.role, user.status, user.added_by, DATE_FORMAT(user.added_time, '%Y-%m-%d %H:%i:%s') AS added_time, user.updated_by, DATE_FORMAT(user.updated_time, '%Y-%m-%d %H:%i:%s') AS updated_time\n        FROM user\n        INNER JOIN user_role ON user_role.id = user.role\n        WHERE user.id = ? ", [id])];
            case 1:
                result = _a.sent();
                if (!result.status) {
                    return [2 /*return*/, result];
                }
                if (result.data.length === 0) {
                    return [2 /*return*/, DefaultResponse_1.default.errorFormat("404")];
                }
                return [2 /*return*/, DefaultResponse_1.default.successFormat("200", result.data[0])];
            case 2:
                err_4 = _a.sent();
                logger_1.default.error(err_4);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 3: return [2 /*return*/];
        }
    });
}); };
var user_forget_password = function (tempKey, email) { return __awaiter(void 0, void 0, void 0, function () {
    var currentDateTime, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                currentDateTime = luxon_1.DateTime.now().setZone("Asia/colombo").toFormat("y-MM-dd HH:mm:ss");
                return [4 /*yield*/, db_1.default.query("UPDATE user SET temp_key = ?, temp_key_timestamp = ? WHERE email = ? && (temp_key_timestamp + INTERVAL 1 HOUR < '".concat(currentDateTime, "' || temp_key_timestamp is null)"), [tempKey, currentDateTime, email])];
            case 1:
                result = _a.sent();
                if (result.status) {
                    if (result.data.changedRows === 0) {
                        return [2 /*return*/, DefaultResponse_1.default.errorFormat("000", "Password reset link already sended. check your email inbox.")];
                    }
                    else {
                        return [2 /*return*/, DefaultResponse_1.default.successFormat("200")];
                    }
                }
                return [2 /*return*/, result];
            case 2:
                err_5 = _a.sent();
                logger_1.default.error(err_5);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 3: return [2 /*return*/];
        }
    });
}); };
var user_view_by_email = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.query("SELECT user.id, user.first_name, user.last_name\n        FROM user\n        WHERE user.email = ?", [email])];
            case 1:
                result = _a.sent();
                if (!result.status) {
                    return [2 /*return*/, result];
                }
                if (result.data.length === 0) {
                    return [2 /*return*/, DefaultResponse_1.default.errorFormat("404")];
                }
                return [2 /*return*/, DefaultResponse_1.default.successFormat("200", result.data[0])];
            case 2:
                err_6 = _a.sent();
                logger_1.default.error(err_6);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 3: return [2 /*return*/];
        }
    });
}); };
var user_reset_password_validation = function (id, tempKey) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.query("SELECT user.id, user.role\n        FROM user\n        WHERE user.id = ? && user.temp_key = ? && temp_key != ?", [id, tempKey, ""])];
            case 1:
                result = _a.sent();
                if (!result.status) {
                    return [2 /*return*/, result];
                }
                if (result.data.length === 0) {
                    return [2 /*return*/, DefaultResponse_1.default.errorFormat("000", "This link was expired")];
                }
                return [2 /*return*/, DefaultResponse_1.default.successFormat("200", result.data[0])];
            case 2:
                err_7 = _a.sent();
                logger_1.default.error(err_7);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 3: return [2 /*return*/];
        }
    });
}); };
var user_reset_password = function (password, id, tempKey, role) { return __awaiter(void 0, void 0, void 0, function () {
    var currentDateTime, result, accessToken, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                currentDateTime = luxon_1.DateTime.now().setZone("Asia/colombo").toFormat("y-MM-dd HH:mm:ss");
                return [4 /*yield*/, bcrypt_1.default.hash(password, config_1.default.pass_salt)];
            case 1:
                password = _a.sent(); // Hash the password
                return [4 /*yield*/, db_1.default.query("UPDATE user SET password = ?, temp_key = ?, updated_time = ? WHERE id = ? && temp_key = ? && temp_key != ?", [password, "", currentDateTime, id, tempKey, ""])];
            case 2:
                result = _a.sent();
                if (!result.status) {
                    return [2 /*return*/, result];
                }
                accessToken = jsonwebtoken_1.default.sign({ user: id, role: role }, config_1.default.jwt_access_key, {
                    expiresIn: parseInt(config_1.default.jwt_a_max_age),
                });
                return [2 /*return*/, DefaultResponse_1.default.successFormat("200", {
                        accessToken: accessToken,
                        role: role,
                        userId: id
                    })];
            case 3:
                err_8 = _a.sent();
                logger_1.default.error(err_8);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 4: return [2 /*return*/];
        }
    });
}); };
var user_login_session_add = function (userId, token, ipAddress, osName) { return __awaiter(void 0, void 0, void 0, function () {
    var currentDateTime, result, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                console.log(userId, token, ipAddress, osName);
                currentDateTime = luxon_1.DateTime.now().setZone("Asia/Colombo").toFormat("y-MM-dd HH:mm:ss");
                return [4 /*yield*/, bcrypt_1.default.hash(token.split('').reverse().join(''), config_1.default.pass_salt)];
            case 1:
                token = _a.sent(); // Hash the token
                return [4 /*yield*/, db_1.default.query('INSERT INTO `user_login_session`(user_id, token, login_time, ip_address, os_name) VALUES (?, ?, ?, ?, ?)', [userId, token, currentDateTime, ipAddress, osName])];
            case 2:
                result = _a.sent();
                if (result.status) {
                    return [2 /*return*/, DefaultResponse_1.default.successFormat("200", {
                            insertId: result.data.insertId
                        })];
                }
                return [2 /*return*/, result];
            case 3:
                err_9 = _a.sent();
                logger_1.default.error(err_9);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 4: return [2 /*return*/];
        }
    });
}); };
var user_login_session_remove = function (id, authUserId) { return __awaiter(void 0, void 0, void 0, function () {
    var currentDateTime, result, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                currentDateTime = luxon_1.DateTime.now().setZone("Asia/Colombo").toFormat("y-MM-dd HH:mm:ss");
                return [4 /*yield*/, db_1.default.query('UPDATE `user_login_session` SET status = ? WHERE id = ? && user_id = ? ', [2, id, authUserId])];
            case 1:
                result = _a.sent();
                if (result.status) {
                    return [2 /*return*/, DefaultResponse_1.default.successFormat("200")];
                }
                return [2 /*return*/, result];
            case 2:
                err_10 = _a.sent();
                logger_1.default.error(err_10);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500")];
            case 3: return [2 /*return*/];
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
    user_view_by_email: user_view_by_email,
    user_reset_password_validation: user_reset_password_validation,
    user_reset_password: user_reset_password,
    user_login_session_add: user_login_session_add,
    user_login_session_remove: user_login_session_remove
};
//# sourceMappingURL=user.model.js.map