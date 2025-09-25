"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var design_controller_1 = __importDefault(require("../../controllers/design.controller"));
var authenticate_1 = require("../../middlewares/authenticate");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var router = express_1.default.Router();
// Multer storage for designs
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var folder = path_1.default.join(process.cwd(), "uploads", "designs");
        if (!fs_1.default.existsSync(folder))
            fs_1.default.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
router.post("/upload", authenticate_1.authenticate, upload.array("files"), design_controller_1.default.design_upload);
router.get("/list", design_controller_1.default.design_list);
router.post("/delete", authenticate_1.authenticate, design_controller_1.default.design_delete);
exports.default = router;
/**
 * @swagger
 * tags:
 *   name: designs
 *   description: Design management
 */
/**
 * @swagger
 * /design/upload:
 *   post:
 *     summary: Upload multiple design images
 *     tags: [designs]
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
 *         description: Designs uploaded successfully
 */
/**
 * @swagger
 * /design/list:
 *   get:
 *     summary: List all designs
 *     tags: [designs]
 *
 *     responses:
 *       '200':
 *         description: Success
 */
/**
 * @swagger
 * /design/delete:
 *   post:
 *     summary: Delete a design by ID
 *     tags: [designs]
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
 *         description: Design deleted successfully
 */
//# sourceMappingURL=design.route.js.map