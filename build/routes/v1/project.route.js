"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var project_controller_1 = __importDefault(require("../../controllers/project.controller"));
var express_1 = __importDefault(require("express"));
var authenticate_1 = require("../../middlewares/authenticate");
var router = express_1.default.Router();
router.post('/add', authenticate_1.authenticate, project_controller_1.default.project_add);
router.post('/edit', authenticate_1.authenticate, project_controller_1.default.project_edit);
router.get('/list', authenticate_1.authenticate, project_controller_1.default.project_list);
router.post('/view', authenticate_1.authenticate, project_controller_1.default.project_view);
router.get('/active/list', authenticate_1.authenticate, project_controller_1.default.project_active_list);
router.post('/status/change', authenticate_1.authenticate, project_controller_1.default.project_status_change);
router.post('/delete', authenticate_1.authenticate, project_controller_1.default.project_delete);
exports.default = router;
/**
 * @swagger
 * tags:
 *   name: project
 *   description: project management
 */
/**
 * @swagger
 * /project/add:
 *   post:
 *     summary: project
 *     description: project_add
 *     tags: [project]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: name
 *                 example: "example text"
 *               status:
 *                 type: string
 *                 description: status
 *                 example: "ongoing"
 *               description:
 *                 type: string
 *                 description: description
 *                 example: "example text"
 *     responses:
 *       '200':
 *         description: Success
 */
/**
 * @swagger
 * /project/edit:
 *   post:
 *     summary: project
 *     description: project_edit
 *     tags: [project]
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
 *                 description: id
 *                 example: "1"
 *               name:
 *                 type: string
 *                 description: name
 *                 example: "example text"
 *               status:
 *                 type: string
 *                 description: status
 *                 example: "ongoing"
 *               description:
 *                 type: string
 *                 description: description
 *                 example: "example text"
 *     responses:
 *       '200':
 *         description: Success
 */
/**
 * @swagger
 * /project/list:
 *   get:
 *     summary: project
 *     description: project_list
 *     tags: [project]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 */
/**
 * @swagger
 * /project/view:
 *   post:
 *     summary: project
 *     description: project_view
 *     tags: [project]
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
 *                 description: id
 *                 example: "1"
 *     responses:
 *       '200':
 *         description: Success
 */
/**
 * @swagger
 * /project/active/list:
 *   get:
 *     summary: project
 *     description: project_active_list
 *     tags: [project]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 */
/**
 * @swagger
 * /project/status/change:
 *   post:
 *     summary: project
 *     description: project_edit
 *     tags: [project]
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
 *                 description: id
 *                 example: "1"
 *               status:
 *                 type: string
 *                 description: status
 *                 example: "ongoing"
 *     responses:
 *       '200':
 *         description: Success
 */
/**
 * @swagger
 * /project/delete:
 *   post:
 *     summary: project
 *     description: project_delete
 *     tags: [project]
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
 *                 description: id
 *                 example: "1"
 *               status:
 *                 type: string
 *                 description: status
 *                 example: "deleted"
 *     responses:
 *       '200':
 *         description: Success
 */ 
//# sourceMappingURL=project.route.js.map