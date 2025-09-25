import express, { Router } from "express";
import multer from "multer";
import controller from "../../controllers/design.controller";
import { authenticate } from "../../middlewares/authenticate";
import path from "path";
import fs from "fs";

const router: Router = express.Router();

// Multer storage for designs
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(process.cwd(), "uploads", "designs");
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", authenticate, upload.array("files"), controller.design_upload);
router.get("/list", controller.design_list);
router.post("/delete", authenticate, controller.design_delete);

export default router;

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
