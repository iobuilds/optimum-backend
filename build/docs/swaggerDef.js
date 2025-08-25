"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config/config"));
var swaggerDef = {
    openapi: '3.0.0',
    info: {
        title: 'Documentation',
        version: "1.0.0",
        license: {
            name: 'MIT',
            url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
        },
    },
    servers: [
        {
            url: "".concat(config_1.default.sysDomain, "/api/v1"),
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
};
exports.default = swaggerDef;
//# sourceMappingURL=swaggerDef.js.map