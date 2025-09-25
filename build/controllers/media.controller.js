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
var logger_1 = __importDefault(require("../config/logger"));
var DefaultResponse_1 = __importDefault(require("../utils/DefaultResponse"));
var authorize_1 = __importDefault(require("../utils/authorize"));
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var media_service_1 = __importDefault(require("../services/media.service"));
var media_validate_1 = __importDefault(require("../validate/media.validate"));
var validate_1 = __importDefault(require("../utils/validate"));
// Upload media
var media_upload = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validatedBody, authData, payload, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, media_validate_1.default.media_upload.validateAsync(req.body)];
            case 1:
                validatedBody = _a.sent();
                authData = (0, authorize_1.default)("project_media", "media_upload", req);
                if (!authData.status)
                    return [2 /*return*/, DefaultResponse_1.default.error(res, "403")];
                payload = {
                    project_id: Number(validatedBody.project_id),
                    files: req.files,
                    authUserId: authData.data.user,
                    authUserRole: authData.data.role,
                };
                return [4 /*yield*/, media_service_1.default.media_upload(payload)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).send(result)];
            case 3:
                err_1 = _a.sent();
                console.error("Upload error:", err_1);
                return [2 /*return*/, DefaultResponse_1.default.error(res, "500")];
            case 4: return [2 /*return*/];
        }
    });
}); });
// List media
var media_list = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, projectId, payload, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, media_validate_1.default.media_list.validateAsync(req.body)];
            case 1:
                data = _a.sent();
                projectId = Number(data.project_id);
                payload = {
                    project_id: projectId,
                };
                return [4 /*yield*/, media_service_1.default.media_list(payload)];
            case 2:
                result = _a.sent();
                // Send response
                return [2 /*return*/, res.status(200).json(result)];
            case 3:
                err_2 = _a.sent();
                console.error("List error:", err_2);
                return [2 /*return*/, DefaultResponse_1.default.error(res, "500")];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Delete media
var media_delete = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, mediaId, authData, payload, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, media_validate_1.default.media_delete.validateAsync(req.body)];
            case 1:
                data = _a.sent();
                mediaId = Number(data.id);
                authData = (0, authorize_1.default)("project_media", "media_delete", req);
                if (!authData.status) {
                    return [2 /*return*/, DefaultResponse_1.default.error(res, "403")];
                }
                payload = {
                    id: mediaId,
                    authUserId: authData.data.user,
                    authUserRole: authData.data.role,
                };
                return [4 /*yield*/, media_service_1.default.media_delete(payload)];
            case 2:
                result = _a.sent();
                // 5. Return full DefaultResponse
                return [2 /*return*/, res.status(200).json(result)];
            case 3:
                err_3 = _a.sent();
                console.error("Delete error:", err_3);
                return [2 /*return*/, DefaultResponse_1.default.error(res, "500")];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Upload feature image
var feature_image_upload = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validatedBody, authData, payload, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, media_validate_1.default.feature_image_upload.validateAsync(req.body)];
            case 1:
                validatedBody = _a.sent();
                authData = (0, authorize_1.default)("project_media", "feature_image_upload", req);
                if (!authData.status)
                    return [2 /*return*/, DefaultResponse_1.default.error(res, "403")];
                // 3. Ensure file exists
                if (!req.file) {
                    return [2 /*return*/, DefaultResponse_1.default.error(res, "400", "No feature image file uploaded")];
                }
                payload = {
                    project_id: Number(validatedBody.project_id),
                    file: req.file,
                    authUserId: authData.data.user,
                    authUserRole: authData.data.role,
                };
                return [4 /*yield*/, media_service_1.default.feature_image_upload(payload)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).send(result)];
            case 3:
                err_4 = _a.sent();
                console.error("Feature image upload error:", err_4);
                return [2 /*return*/, DefaultResponse_1.default.error(res, "500")];
            case 4: return [2 /*return*/];
        }
    });
}); });
var feature_image_getById = (0, catchAsync_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, authData, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, validate_1.default)(req.body, media_validate_1.default.feature_image_view)];
            case 1:
                data = _a.sent();
                if (!data.status) {
                    res.status(200).send(data);
                    return [2 /*return*/];
                }
                authData = (0, authorize_1.default)('project_media', 'view_feature_image', req);
                if (!authData.status) {
                    DefaultResponse_1.default.error(res, '403');
                    return [2 /*return*/];
                }
                data.data.authUserId = authData.data.user;
                data.data.authUserRole = authData.data.role;
                return [4 /*yield*/, media_service_1.default.feature_image_view(data.data)];
            case 2:
                result = _a.sent();
                res.status(200).send(result);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                logger_1.default.error(err_5);
                DefaultResponse_1.default.error(res, "500");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = {
    media_upload: media_upload,
    media_list: media_list,
    media_delete: media_delete,
    feature_image_upload: feature_image_upload,
    feature_image_getById: feature_image_getById
};
//# sourceMappingURL=media.controller.js.map