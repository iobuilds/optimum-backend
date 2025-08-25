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
var dotenv = __importStar(require("dotenv"));
var path = __importStar(require("path"));
var joi_1 = __importDefault(require("joi"));
dotenv.config({ path: path.join(__dirname, '..', '../.env') });
var envVarsSchema = joi_1.default.object({
    NODE_ENV: joi_1.default.string().valid('production', 'development', 'test'),
    PORT: joi_1.default.number().default(8000),
    DOMAIN: joi_1.default.string().description('Domain name'),
    SYSTEM_DOMAIN: joi_1.default.string().description('Backend Domain name'),
    SMTP_HOST: joi_1.default.string().description('server that will send the emails'),
    SMTP_PORT: joi_1.default.number().description('port to connect to the email server'),
    SMTP_USERNAME: joi_1.default.string().description('username for the email server'),
    SMTP_PASSWORD: joi_1.default.string().description('password for the email server'),
    EMAIL_FROM: joi_1.default.string().description('the from field in the emails sent by the app'),
    DB_HOST: joi_1.default.string().description('database host'),
    DB_USER: joi_1.default.string().description('database user'),
    // DB_PASSWORD: Joi.string().description('database password'),
    DB_NAME: joi_1.default.string().description('database name').allow(""),
    DB_PORT: joi_1.default.number().default(3306),
    DB_PRODUCTION_HOST: joi_1.default.string().description('database host'),
    DB_PRODUCTION_USER: joi_1.default.string().description('database user'),
    DB_PRODUCTION_PASSWORD: joi_1.default.string().description('database password').allow(""),
    DB_PRODUCTION_NAME: joi_1.default.string().description('database name'),
    DB_PRODUCTION_PORT: joi_1.default.number().default(3306),
    S3_SECRET_ACCESS_KEY: joi_1.default.string().allow(""),
    S3_ACCESS_KEY_ID: joi_1.default.string().allow(""),
    S3_REGION: joi_1.default.string().allow(""),
    S3_URL: joi_1.default.string().allow(""),
    S3_BUCKET: joi_1.default.string().allow(""),
}).unknown();
var _a = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env), envVars = _a.value, error = _a.error;
if (error) {
    throw new Error("Config validation error: ".concat(error.message));
}
var isProduction = envVars.NODE_ENV === "production";
var config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwt_access_key: envVars.JWT_ACCESS,
    jwt_a_max_age: envVars.JWT_A_MAX_AGE,
    pass_salt: envVars.PASS_SALT,
    domain: envVars.DOMAIN,
    sysDomain: envVars.SYSTEM_DOMAIN,
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD,
            },
        },
        from: envVars.EMAIL_FROM,
    },
    db: {
        host: isProduction ? envVars.DB_PRODUCTION_HOST : envVars.DB_HOST,
        port: isProduction ? envVars.DB_PRODUCTION_PORT : envVars.DB_PORT,
        user: isProduction ? envVars.DB_PRODUCTION_USER : envVars.DB_USER,
        password: isProduction ? envVars.DB_PRODUCTION_PASSWORD : envVars.DB_PASSWORD,
        database: isProduction ? envVars.DB_PRODUCTION_NAME : envVars.DB_NAME,
    },
    s3: {
        region: envVars.S3_REGION,
        accessKey: envVars.S3_ACCESS_KEY_ID,
        secretIKey: envVars.S3_SECRET_ACCESS_KEY,
        url: envVars.S3_URL,
        bucket: envVars.S3_BUCKET,
    }
};
exports.default = config;
//# sourceMappingURL=config.js.map