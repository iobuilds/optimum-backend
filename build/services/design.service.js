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
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var logger_1 = __importDefault(require("../config/logger"));
var DefaultResponse_1 = __importDefault(require("../utils/DefaultResponse"));
var design_model_1 = __importDefault(require("../models/design.model"));
var ensureDesignFolder = function () {
    var folder = path_1.default.join(process.cwd(), "uploads", "designs");
    if (!fs_1.default.existsSync(folder))
        fs_1.default.mkdirSync(folder, { recursive: true });
    return folder;
};
var design_upload = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var folder, savedFiles, _i, _a, file, destPath, dbPath, dbResult, err_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                folder = ensureDesignFolder();
                savedFiles = [];
                _i = 0, _a = data.files;
                _c.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                file = _a[_i];
                destPath = path_1.default.join(folder, file.originalname);
                if (file.path) {
                    fs_1.default.renameSync(file.path, destPath);
                }
                else if (file.buffer) {
                    fs_1.default.writeFileSync(destPath, file.buffer);
                }
                dbPath = "/uploads/designs/".concat(file.originalname);
                return [4 /*yield*/, design_model_1.default.design_add(dbPath, data.authUserId)];
            case 2:
                dbResult = _c.sent();
                savedFiles.push({
                    id: ((_b = dbResult.data) === null || _b === void 0 ? void 0 : _b.insertId) || null,
                    filename: file.originalname,
                    url: dbPath,
                });
                _c.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, DefaultResponse_1.default.successFormat("200", {
                    message: "Designs uploaded successfully",
                    files: savedFiles,
                })];
            case 5:
                err_1 = _c.sent();
                logger_1.default.error("Design upload error", err_1);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500", "Design upload failed")];
            case 6: return [2 /*return*/];
        }
    });
}); };
var design_list = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, design_model_1.default.design_list()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, DefaultResponse_1.default.successFormat("200", { files: result.data || [] })];
            case 2:
                err_2 = _a.sent();
                logger_1.default.error(err_2);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500", "Failed to fetch designs")];
            case 3: return [2 /*return*/];
        }
    });
}); };
var design_delete = function (id, authUserId) { return __awaiter(void 0, void 0, void 0, function () {
    var result, design, filePath, deleteResult, err_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, design_model_1.default.design_list()];
            case 1:
                result = _b.sent();
                design = (_a = result.data) === null || _a === void 0 ? void 0 : _a.find(function (d) { return d.id === id; });
                if (!design)
                    return [2 /*return*/, DefaultResponse_1.default.errorFormat("404", "Design not found")];
                filePath = path_1.default.join(process.cwd(), design.url);
                if (fs_1.default.existsSync(filePath))
                    fs_1.default.unlinkSync(filePath);
                return [4 /*yield*/, design_model_1.default.design_delete(id)];
            case 2:
                deleteResult = _b.sent();
                return [2 /*return*/, deleteResult];
            case 3:
                err_3 = _b.sent();
                logger_1.default.error(err_3);
                return [2 /*return*/, DefaultResponse_1.default.errorFormat("500", "Failed to delete design")];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    design_upload: design_upload,
    design_list: design_list,
    design_delete: design_delete,
};
//# sourceMappingURL=design.service.js.map