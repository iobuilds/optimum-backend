"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var media_controller_1 = __importDefault(require("../../controllers/media.controller"));
var express_1 = __importDefault(require("express"));
var authenticate_1 = require("../../middlewares/authenticate");
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var router = express_1.default.Router();
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var projectId = req.body.project_id;
        if (!projectId)
            return cb(new Error("project_id is required"), "");
        var baseFolder = path_1.default.join(__dirname, "../../uploads", "project_".concat(projectId));
        var imagesFolder = path_1.default.join(baseFolder, "images");
        var videosFolder = path_1.default.join(baseFolder, "videos");
        [baseFolder, imagesFolder, videosFolder].forEach(function (folder) {
            if (!fs_1.default.existsSync(folder))
                fs_1.default.mkdirSync(folder, { recursive: true });
        });
        var folder = file.mimetype.startsWith("image/") ? imagesFolder : videosFolder;
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = (0, multer_1.default)({ storage: storage });
router.post("/upload", authenticate_1.authenticate, upload.array("files"), media_controller_1.default.media_upload);
router.post("/list", authenticate_1.authenticate, media_controller_1.default.media_list);
router.post("/delete", authenticate_1.authenticate, media_controller_1.default.media_delete);
exports.default = router;
/**
 * @swagger
 * tags:
 *   name: media
 *   description: project media management
 */
/**
 * @swagger
 * /media/upload:
 *   post:
 *     summary: Upload project media
 *     tags:
 *       - media
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: number
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 minItems: 1
 *                 uniqueItems: true
 *           encoding:
 *             files:
 *               style: form
 *               explode: true
 *     responses:
 *       '200':
 *         description: Success
 */
/**
 * @swagger
 * /media/list:
 *   post:
 *     summary: List project media
 *     tags: [media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Success
 */
/**
 * @swagger
 * /media/delete:
 *   post:
 *     summary: Delete project media
 *     tags: [media]
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
 *         description: Success
 */
//# sourceMappingURL=media.route.js.map