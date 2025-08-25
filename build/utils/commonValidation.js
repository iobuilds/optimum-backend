"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIPAddress = exports.isValidTimeString = exports.isValidDateString = exports.xssPrevent = exports.validatePhoneNumber = void 0;
var sanitize_html_1 = __importDefault(require("sanitize-html"));
var he = __importStar(require("he"));
var validatePhoneNumber = function (phoneNumber) {
    var phoneStr = String(phoneNumber);
    // Remove all non-digit characters
    var digitsOnly = phoneStr.replace(/\D/g, '');
    // Check if the phone number is a valid length
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
        return false;
    }
    // Check if the phone number is in a valid format
    var regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    return regex.test(phoneStr);
};
exports.validatePhoneNumber = validatePhoneNumber;
var xssPrevent = function (str, allowedTags, htmlEncode) {
    if (allowedTags === void 0) { allowedTags = []; }
    if (htmlEncode === void 0) { htmlEncode = 1; }
    if (htmlEncode === 1) {
        str = he.encode(str);
    }
    return (0, sanitize_html_1.default)(str, {
        allowedTags: allowedTags,
    })
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'");
};
exports.xssPrevent = xssPrevent;
var isValidDateString = function (dateString) {
    // Check if the date string matches the format YYYY-MM-DD
    var regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
        return false;
    }
    // Check if the date is valid
    var isValidDate = !isNaN(Date.parse(dateString));
    return isValidDate;
};
exports.isValidDateString = isValidDateString;
var isValidTimeString = function (timeString) {
    var regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(timeString);
};
exports.isValidTimeString = isValidTimeString;
function validateIPAddress(ipAddress) {
    // Regular expressions for IPv4 and IPv6 addresses
    var ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4Regex.test(ipAddress) || ipv6Regex.test(ipAddress);
}
exports.validateIPAddress = validateIPAddress;
//# sourceMappingURL=commonValidation.js.map