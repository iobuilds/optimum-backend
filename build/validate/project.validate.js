"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var commonValidation_1 = require("../utils/commonValidation");
var project_add = joi_1.default.object({
    name: joi_1.default.string()
        .min(1)
        .max(200)
        .label("name")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); })
        .required(),
    description: joi_1.default.string()
        .min(1)
        .max(5000)
        .label("description")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); })
        .allow("")
        .allow(null),
    status: joi_1.default.string()
        .min(1)
        .max(100)
        .label("status")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); }),
});
var project_edit = joi_1.default.object({
    id: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .allow(),
    name: joi_1.default.string()
        .min(1)
        .max(200)
        .label("name")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); })
        .required(),
    description: joi_1.default.string()
        .min(1)
        .max(5000)
        .label("description")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); })
        .allow("")
        .allow(null),
    status: joi_1.default.string()
        .min(1)
        .max(100)
        .label("status")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); }),
});
var project_list = joi_1.default.object({});
var project_view = joi_1.default.object({
    id: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .required(),
});
var project_active_list = joi_1.default.object({});
var project_status_change = joi_1.default.object({
    id: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .required(),
    status: joi_1.default.string()
        .min(1)
        .max(100)
        .label("status")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); }),
});
var project_delete = joi_1.default.object({
    id: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .required(),
    status: joi_1.default.string()
        .min(1)
        .max(100)
        .label("status")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); }),
});
exports.default = {
    project_add: project_add,
    project_edit: project_edit,
    project_list: project_list,
    project_view: project_view,
    project_active_list: project_active_list,
    project_status_change: project_status_change,
    project_delete: project_delete
};
//# sourceMappingURL=project.validate.js.map