"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authorization_json_1 = __importDefault(require("../json/authorization.json"));
var authorize = function (module, key, req) {
    var authorizeResponse = {
        status: false,
        data: {
            role: 0,
            user: 0,
            hashToken: ""
        }
    };
    if (req['authorization']) {
        authorizeResponse.data.role = req['authorization'].data.data.role;
        authorizeResponse.data.user = req['authorization'].data.data.user;
        authorizeResponse.data.hashToken = req['authorization'].data.data.hashToken;
    }
    var module_obj = authorization_json_1.default[module];
    if (module_obj) {
        var key_arr = module_obj[key];
        if (key_arr) {
            if (key_arr.includes(authorizeResponse.data.role)) {
                authorizeResponse.status = true;
                return authorizeResponse;
            }
            else {
                return authorizeResponse;
            }
        }
        else {
            return authorizeResponse;
        }
    }
    else {
        return authorizeResponse;
    }
};
exports.default = authorize;
//# sourceMappingURL=authorize.js.map