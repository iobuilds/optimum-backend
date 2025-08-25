"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var commonValidation_1 = require("../utils/commonValidation");
var user_login = joi_1.default.object({
    email: joi_1.default.string()
        .min(1)
        .max(1000)
        .label("email")
        .messages({ 'string.min': 'wrong ' })
        .required(),
    password: joi_1.default.string()
        .min(1)
        .max(1000)
        .label("password")
        .messages({ 'string.min': 'wrong ' })
        .required(),
});
var user_add = joi_1.default.object({
    firstName: joi_1.default.string()
        .min(1)
        .max(100)
        .label("first name")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); })
        .required(),
    lastName: joi_1.default.string()
        .min(1)
        .max(100)
        .label("last name")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); })
        .required(),
    email: joi_1.default.string()
        .min(1)
        .max(200)
        .label("email")
        .required(),
    phoneNumber: joi_1.default.string()
        .label("phone number")
        .custom(function (value, helper) {
        if (!(0, commonValidation_1.validatePhoneNumber)(value)) {
            return helper.message({ custom: "phone number is incorrect" });
        }
        return value;
    })
        .required(),
    password: joi_1.default.string()
        .min(1)
        .max(1000)
        .label("password")
        .messages({ 'string.min': 'wrong password' })
        .required(),
    role: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .label("role")
        .required(),
});
var user_edit = joi_1.default.object({
    id: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .required(),
    firstName: joi_1.default.string()
        .min(1)
        .max(100)
        .label("first name")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); })
        .required(),
    lastName: joi_1.default.string()
        .min(1)
        .max(100)
        .label("last name")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); })
        .required(),
    email: joi_1.default.string()
        .min(1)
        .max(200)
        .label("email")
        .required(),
    phoneNumber: joi_1.default.string()
        .label("phone number")
        .custom(function (value, helper) {
        if (!(0, commonValidation_1.validatePhoneNumber)(value)) {
            return helper.message({ custom: "phone number is incorrect" });
        }
        return value;
    })
        .required(),
    password: joi_1.default.string()
        .min(1)
        .max(1000)
        .label("password")
        .messages({ 'string.min': 'wrong password' })
        .required(),
    role: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .label("role")
        .required(),
});
var user_list = joi_1.default.object({});
var user_view = joi_1.default.object({
    id: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .required(),
});
var user_forget_password = joi_1.default.object({
    email: joi_1.default.string()
        .min(1)
        .max(1000)
        .label("E-mail")
        .messages({ 'string.min': 'wrong E-mail' })
        .email()
        .required(),
});
var user_reset_password = joi_1.default.object({
    id: joi_1.default.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .required(),
    password: joi_1.default.string()
        .min(6)
        .max(150)
        .label("password")
        .messages({ 'string.min': 'wrong password' })
        .required(),
    tempKey: joi_1.default.string()
        .min(1)
        .max(100)
        .label("tempKey")
        .messages({ 'string.min': 'wrong tempKey' })
        .required(),
});
exports.default = {
    user_login: user_login,
    user_add: user_add,
    user_edit: user_edit,
    user_list: user_list,
    user_view: user_view,
    user_forget_password: user_forget_password,
    user_reset_password: user_reset_password
};
//# sourceMappingURL=user.validate.js.map