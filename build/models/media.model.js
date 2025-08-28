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
var db_1 = __importDefault(require("../config/db"));
var logger_1 = __importDefault(require("../config/logger"));
var DefaultResponse_1 = __importDefault(require("../utils/DefaultResponse"));
var luxon_1 = require("luxon");
var media_add = function (project_id, type, url, authUserId) { return __awaiter(void 0, void 0, void 0, function () {
    var exists, currentDateTime, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db_1.default.query("SELECT id FROM project_media WHERE project_id = ? AND type = ? AND url = ?", [project_id, type, url])];
            case 1:
                exists = _a.sent();
                if (exists.status && exists.data.length > 0) {
                    return [2 /*return*/, DefaultResponse_1.default.successFormat("200", {
                            message: "Media already exists",
                            id: exists.data[0].id,
                        })];
                }
                currentDateTime = luxon_1.DateTime.now()
                    .setZone("Asia/Colombo")
                    .toFormat("y-MM-dd HH:mm:ss");
                return [4 /*yield*/, db_1.default.query("INSERT INTO project_media (project_id, type, url, added_by, added_time) \n       VALUES (?, ?, ?, ?, ?)", [project_id, type, url, authUserId, currentDateTime])];
            case 2:
                result = _a.sent();
                if (result.status) {
                    return [2 /*return*/, DefaultResponse_1.default.successFormat("200", {
                            insertId: result.data.insertId,
                        })];
                }
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500", "Failed to insert media")];
            case 3:
                err_1 = _a.sent();
                logger_1.default.error("media_add error", err_1);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500", "Internal server error")];
            case 4: return [2 /*return*/];
        }
    });
}); };
// List all media for a project
var media_list = function (project_id) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.query("SELECT id, project_id, type, url, added_by,\n        DATE_FORMAT(added_time, '%Y-%m-%d %H:%i:%s') AS added_time\n       FROM project_media\n       WHERE project_id = ? ORDER BY id DESC", [project_id])];
            case 1:
                result = _a.sent();
                // Ensure the response has status and data
                return [2 /*return*/, { status: true, data: result.data || [] }];
            case 2:
                err_2 = _a.sent();
                logger_1.default.error(err_2);
                return [2 /*return*/, { status: false, data: [], message: "DB error" }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var media_getById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.query("SELECT id, project_id, type, url, added_by,\n        DATE_FORMAT(added_time, '%Y-%m-%d %H:%i:%s') AS added_time\n       FROM project_media\n       WHERE id = ? LIMIT 1", [id])];
            case 1:
                result = _a.sent();
                if (result.status && result.data.length > 0) {
                    return [2 /*return*/, result.data[0]]; // plain object
                }
                return [2 /*return*/, null];
            case 2:
                err_3 = _a.sent();
                logger_1.default.error(err_3);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
var media_deleteById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.query("DELETE FROM project_media WHERE id = ?", [id])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.status];
            case 2:
                err_4 = _a.sent();
                logger_1.default.error(err_4);
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    media_add: media_add,
    media_list: media_list,
    media_getById: media_getById,
    media_deleteById: media_deleteById,
};
//# sourceMappingURL=media.model.js.map