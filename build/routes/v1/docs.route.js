"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swaggerDef_1 = __importDefault(require("../../docs/swaggerDef"));
var router = express_1.default.Router();
var specs = (0, swagger_jsdoc_1.default)({
    swaggerDefinition: swaggerDef_1.default,
    apis: ['src/routes/v1/*.ts'],
});
router.use('/', swagger_ui_express_1.default.serve);
router.get('/', swagger_ui_express_1.default.setup(specs, { explorer: true }));
router.get('/swagger.json', function (req, res) {
    res.json(specs);
});
exports.default = router;
//# sourceMappingURL=docs.route.js.map