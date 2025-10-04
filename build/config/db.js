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
var config_1 = __importDefault(require("./config"));
var promise_1 = __importDefault(require("mysql2/promise"));
var logger_1 = __importDefault(require("./logger"));
var pool = promise_1.default.createPool({
    host: config_1.default.db.host,
    user: config_1.default.db.user,
    password: config_1.default.db.password,
    database: config_1.default.db.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
logger_1.default.info('DB pool created');
var query = function (sql, params, dev) {
    if (params === void 0) { params = []; }
    return __awaiter(void 0, void 0, void 0, function () {
        var responseBody, connection, rows, err_1, sqlMessage, columnName;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    responseBody = { status: true };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, pool.getConnection()];
                case 2:
                    connection = _b.sent();
                    return [4 /*yield*/, connection.execute(sql, params)];
                case 3:
                    rows = (_b.sent())[0];
                    responseBody.data = rows;
                    return [2 /*return*/, responseBody];
                case 4:
                    err_1 = _b.sent();
                    responseBody.status = false;
                    logger_1.default.error('Error executing query', err_1);
                    if ((err_1 === null || err_1 === void 0 ? void 0 : err_1.errno) === 1062) {
                        sqlMessage = err_1.sqlMessage || '';
                        columnName = ((_a = /for key '(\w+)'/.exec(sqlMessage)) === null || _a === void 0 ? void 0 : _a[1]) || '';
                        responseBody.message = "This \"".concat(columnName, "\" already exists.");
                        responseBody.code = '1062';
                    }
                    else {
                        responseBody.message = dev ? JSON.stringify(err_1) : 'Something went wrong';
                    }
                    return [2 /*return*/, responseBody];
                case 5:
                    if (connection)
                        connection.release();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.default = { query: query };
//# sourceMappingURL=db.js.map