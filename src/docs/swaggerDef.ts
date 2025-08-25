import config from '../config/config';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDef:SwaggerDefinition = {
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
      url: `${config.sysDomain}/api/v1`,
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

export default swaggerDef;
