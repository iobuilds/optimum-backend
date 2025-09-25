"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var plan_controller_1 = __importDefault(require("../../controllers/plan.controller"));
var authenticate_1 = require("../../middlewares/authenticate");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var router = express_1.default.Router();
// Multer storage for plans (PDFs)
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var folder = path_1.default.join(process.cwd(), "uploads", "plans");
        if (!fs_1.default.existsSync(folder))
            fs_1.default.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
router.post("/upload", authenticate_1.authenticate, upload.array("files"), plan_controller_1.default.plan_upload);
router.get("/list", plan_controller_1.default.plan_list);
router.post("/delete", authenticate_1.authenticate, plan_controller_1.default.plan_delete);
exports.default = router;
/**
 * @swagger
 * tags:
 *   name: plans
 *   description: Plan management
 */
/**
 * @swagger
 * /plan/upload:
 *   post:
 *     summary: Upload multiple plan PDFs
 *     tags: [plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 minItems: 1
 *                 uniqueItems: true
 *     responses:
 *       '200':
 *         description: Plans uploaded successfully
 */
/**
 * @swagger
 * /plan/list:
 *   get:
 *     summary: List all plans
 *     tags: [plans]
 *
 *     responses:
 *       '200':
 *         description: Success
 */
/**
 * @swagger
 * /plan/delete:
 *   post:
 *     summary: Delete a plan by ID
 *     tags: [plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Plan deleted successfully
 */
//# sourceMappingURL=plan.route.js.map