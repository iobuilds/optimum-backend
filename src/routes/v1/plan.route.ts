import express, { Router } from "express";
import multer from "multer";
import controller from "../../controllers/plan.controller";
import { authenticate } from "../../middlewares/authenticate";
import path from "path";
import fs from "fs";

const router: Router = express.Router();

// Multer storage for plans (PDFs)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(process.cwd(), "uploads", "plans");
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", authenticate, upload.array("files"), controller.plan_upload);
router.get("/list", controller.plan_list);
router.post("/delete", authenticate, controller.plan_delete);

export default router;

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
