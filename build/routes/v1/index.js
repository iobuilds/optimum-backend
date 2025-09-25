"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("../../config/config"));
var docs_route_1 = __importDefault(require("./docs.route"));
var user_route_1 = __importDefault(require("./user.route"));
var project_route_1 = __importDefault(require("./project.route"));
var media_route_1 = __importDefault(require("./media.route"));
var design_route_1 = __importDefault(require("./design.route"));
var plan_route_1 = __importDefault(require("./plan.route"));
var contact_route_1 = __importDefault(require("./contact.route"));
var router = express_1.default.Router();
var defaultRoutes = [
    { path: '/user', route: user_route_1.default },
    { path: '/project', route: project_route_1.default },
    { path: '/media', route: media_route_1.default },
    { path: '/design', route: design_route_1.default },
    { path: '/plan', route: plan_route_1.default },
    { path: '/contact', route: contact_route_1.default },
];
// routes available only in development mode
var devRoutes = [
    { path: '/docs', route: docs_route_1.default },
];
defaultRoutes.forEach(function (route) {
    router.use(route.path, route.route);
});
if (config_1.default.env === 'development') {
    devRoutes.forEach(function (route) {
        router.use(route.path, route.route);
    });
}
exports.default = router;
//# sourceMappingURL=index.js.map