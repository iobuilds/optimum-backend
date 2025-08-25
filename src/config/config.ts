import * as dotenv from 'dotenv';
import * as path from 'path';
import Joi from 'joi';

dotenv.config( {path: path.join(__dirname, '..', '../.env')} );

interface EnvVars {
  NODE_ENV?: 'production' | 'development' | 'test';
  JWT_ACCESS: string,
  PASS_SALT: string,
  JWT_A_MAX_AGE: string,
  PORT?: number;
  DOMAIN: string;
  SYSTEM_DOMAIN: string;

  SMTP_HOST?: string;
  SMTP_PORT?: number;
  SMTP_USERNAME?: string;
  SMTP_PASSWORD?: string;
  EMAIL_FROM?: string;

  DB_HOST?: string;
  DB_USER?: string;
  DB_PASSWORD?: string;
  DB_NAME?: string;
  DB_PORT: number,

  DB_PRODUCTION_HOST?: string;
  DB_PRODUCTION_USER?: string;
  DB_PRODUCTION_PASSWORD?: string;
  DB_PRODUCTION_NAME?: string;
  DB_PRODUCTION_PORT?: number,

  S3_REGION?: string;
  S3_ACCESS_KEY_ID?: string;
  S3_SECRET_ACCESS_KEY?: string;
  S3_URL?: string;
  S3_BUCKET?: string;
}

const envVarsSchema = Joi.object<EnvVars>({
  NODE_ENV: Joi.string().valid('production', 'development', 'test'),
  PORT: Joi.number().default(8000),
  DOMAIN: Joi.string().description('Domain name'),
  SYSTEM_DOMAIN: Joi.string().description('Backend Domain name'),

  SMTP_HOST: Joi.string().description('server that will send the emails'),
  SMTP_PORT: Joi.number().description('port to connect to the email server'),
  SMTP_USERNAME: Joi.string().description('username for the email server'),
  SMTP_PASSWORD: Joi.string().description('password for the email server'),
  EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),

  DB_HOST: Joi.string().description('database host'),
  DB_USER: Joi.string().description('database user'),
  // DB_PASSWORD: Joi.string().description('database password'),
  DB_NAME: Joi.string().description('database name').allow(""),
  DB_PORT: Joi.number().default(3306),

  DB_PRODUCTION_HOST: Joi.string().description('database host'),
  DB_PRODUCTION_USER: Joi.string().description('database user'),
  DB_PRODUCTION_PASSWORD: Joi.string().description('database password').allow(""),
  DB_PRODUCTION_NAME: Joi.string().description('database name'),
  DB_PRODUCTION_PORT: Joi.number().default(3306),

  S3_SECRET_ACCESS_KEY: Joi.string().allow(""),
  S3_ACCESS_KEY_ID: Joi.string().allow(""),
  S3_REGION: Joi.string().allow(""),
  S3_URL: Joi.string().allow(""),
  S3_BUCKET: Joi.string().allow(""),
}).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const isProduction = envVars.NODE_ENV === "production";
const config = {
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

export default config