"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var media_upload = joi_1.default.object({
    project_id: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .required()
        .label("project_id"),
});
var media_list = joi_1.default.object({
    project_id: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .required()
        .label("project_id"),
});
var media_delete = joi_1.default.object({
    id: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .required()
        .label("id"),
});
var feature_image_upload = joi_1.default.object({
    project_id: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .required()
        .label("project_id"),
});
var feature_image_view = joi_1.default.object({
    project_id: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .required()
        .label("project_id"),
});
exports.default = {
    media_upload: media_upload,
    media_list: media_list,
    media_delete: media_delete,
    feature_image_upload: feature_image_upload,
    feature_image_view: feature_image_view
};
//# sourceMappingURL=media.validate.js.map