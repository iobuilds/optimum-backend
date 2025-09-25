"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var commonValidation_1 = require("../utils/commonValidation");
var contact_add = joi_1.default.object({
    name: joi_1.default.string()
        .min(1)
        .max(200)
        .label("name")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); })
        .required(),
    email: joi_1.default.string()
        .email()
        .min(5)
        .max(200)
        .label("email")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); })
        .required(),
    phone: joi_1.default.string()
        .min(1)
        .max(2147483647)
        .label("phone number")
        .custom(function (value, helper) {
        if (!(0, commonValidation_1.validatePhoneNumber)(value)) {
            return helper.message({ custom: "phone number is incorrect" });
        }
        return value;
    })
        .required(),
    service_type: joi_1.default.string()
        .min(1)
        .max(100)
        .label("service type")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); })
        .required(),
    message: joi_1.default.string()
        .min(1)
        .max(1000)
        .label("message")
        .custom(function (value, helper) { return (0, commonValidation_1.xssPrevent)(value); })
        .required(),
});
exports.default = {
    contact_add: contact_add,
};
//# sourceMappingURL=contact.validate.js.map