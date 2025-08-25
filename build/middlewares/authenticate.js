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
exports.authenticate = void 0;
var DefaultResponse_1 = __importDefault(require("../utils/DefaultResponse"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var db_1 = __importDefault(require("../config/db"));
var node_device_detector_1 = __importDefault(require("node-device-detector"));
var logger_1 = __importDefault(require("../config/logger"));
var commonValidation_1 = require("../utils/commonValidation");
var bcrypt_1 = __importDefault(require("bcrypt"));
var luxon_1 = require("luxon");
var authenticate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token_1, check, data, hashToken, maxAge, currentDateTime, result, detector, userAgentRes, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) return [3 /*break*/, 4];
                token_1 = req.headers.authorization.split(' ')[1];
                if (token_1 == null) {
                    DefaultResponse_1.default.error(res, '401');
                    return [2 /*return*/];
                }
                check = new Promise(function (resolve) {
                    jsonwebtoken_1.default.verify(token_1, config_1.default.jwt_access_key, function (err, data) {
                        if (err) {
                            resolve({
                                status: false,
                            });
                        }
                        else {
                            resolve({
                                status: true,
                                data: data,
                            });
                        }
                    });
                });
                return [4 /*yield*/, check];
            case 1:
                data = _b.sent();
                if (!data.status) {
                    DefaultResponse_1.default.error(res, '401');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(token_1.split('').reverse().join(''), config_1.default.pass_salt)];
            case 2:
                hashToken = _b.sent();
                maxAge = config_1.default.jwt_a_max_age;
                currentDateTime = luxon_1.DateTime.now().setZone("UTC").toFormat("y-MM-dd HH:mm:ss");
                return [4 /*yield*/, db_1.default.query("\n                SELECT user.id\n                FROM user\n                INNER JOIN user_login_session ON user_login_session.user_id = user.id\n                WHERE user.status = 1 && user.id = ? && user.role = ? && user_login_session.token = ? && user_login_session.status = 1 && (DATE_ADD(login_time, INTERVAL ".concat(maxAge, " SECOND) > ?)"), [data.data.user, data.data.role, hashToken, currentDateTime])];
            case 3:
                result = _b.sent();
                if (!result.status) {
                    DefaultResponse_1.default.error(res, '500');
                    return [2 /*return*/];
                }
                if (!result.data || result.data.length === 0) {
                    DefaultResponse_1.default.error(res, '403');
                    return [2 /*return*/];
                }
                detector = new node_device_detector_1.default();
                userAgentRes = detector.detect(req.headers['user-agent']);
                data.data.osName = (0, commonValidation_1.xssPrevent)(userAgentRes.os.name || "");
                data.data.ipAddress = ((_a = (req.headers['x-forwarded-for'] || '').split(',').pop()) === null || _a === void 0 ? void 0 : _a.trim()) || ''; // IP Address
                if (!(0, commonValidation_1.validateIPAddress)(data.data.ipAddress))
                    data.data.ipAddress = "";
                data.data.name = result.data[0].name;
                data.data.auth = result.data[0].auth;
                data.data.hashToken = hashToken;
                req.authorization = {
                    data: data,
                };
                next();
                return [3 /*break*/, 5];
            case 4:
                DefaultResponse_1.default.error(res, '401');
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _b.sent();
                logger_1.default.error(err_1);
                return [2 /*return*/, DefaultResponse_1.default.error(res, '500')];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map