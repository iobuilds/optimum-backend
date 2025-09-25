import controller from "../../controllers/media.controller";
import express, { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import multer from "multer";
import path from "path";
import fs from "fs";

const router: Router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const projectId = req.body.project_id;
    if (!projectId) return cb(new Error("project_id is required"), "");

    const baseFolder = path.join(__dirname, "../../uploads", `project_${projectId}`);
    const imagesFolder = path.join(baseFolder, "images");
    const videosFolder = path.join(baseFolder, "videos");

    [baseFolder, imagesFolder, videosFolder].forEach(folder => {
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    });

    const folder = file.mimetype.startsWith("image/") ? imagesFolder : videosFolder;
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Storage config for feature image
const featureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const baseFolder = path.join(__dirname, "../../uploads", "featureImages");
    if (!fs.existsSync(baseFolder)) fs.mkdirSync(baseFolder, { recursive: true });
    cb(null, baseFolder);
  },
  filename: (req, file, cb) => {
    const projectId = req.body.project_id;
    if (!projectId) return cb(new Error("project_id is required"), "");
    const ext = path.extname(file.originalname);
    cb(null, `project_${projectId}${ext}`); // ensure unique per project
  }
});

const upload = multer({ storage });
const featureUpload = multer({ storage: featureStorage });

router.post("/upload", authenticate, upload.array("files"), controller.media_upload);
router.post("/list", controller.media_list);
router.post("/delete", authenticate, controller.media_delete);
router.post("/feature-upload",authenticate,featureUpload.single("file"),controller.feature_image_upload);
router.post("/feature-view",authenticate,controller.feature_image_getById);
export default router;

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
 *     
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
/**
 * @swagger
 * /media/feature-upload:
 *   post:
 *     summary: Upload project feature image
 *     tags: [media]
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
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Success
 */