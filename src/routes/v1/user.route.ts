import controller from '../../controllers/user.controller';
import express from 'express';
import { Router } from 'express';
import {authenticate} from '../../middlewares/authenticate';
const router: Router = express.Router();
router.post('/login', controller.user_login);
router.post('/add', authenticate, controller.user_add);
router.post('/edit', authenticate, controller.user_edit);
router.get('/list', authenticate, controller.user_list);
router.post('/view', authenticate, controller.user_view);
router.post('/forget/password', controller.user_forget_password);
router.post('/password/change', controller.user_reset_password);

export default router;

/**
 * @swagger
 * tags:
 *   name: user
 *   description: user management
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: user
 *     description: user_login
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: email
 *                 example: "john@gmail.com"
 *               password:
 *                 type: string
 *                 description: password
 *                 example: "123456"
 *     responses:
 *       '200':
 *         description: Success
 */

/**
 * @swagger
 * /user/add:
 *   post:
 *     summary: user
 *     description: user_add
 *     tags: [user]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: first name
 *                 example: "example text"
 *               lastName:
 *                 type: string
 *                 description: last name
 *                 example: "example text"
 *               email:
 *                 type: string
 *                 description: email
 *                 example: "example text"
 *               phoneNumber:
 *                 type: number
 *                 description: phone number
 *                 example: "0760358784"
 *               password:
 *                 type: string
 *                 description: password
 *                 example: "example text"
 *               role:
 *                 type: number
 *                 description: role
 *                 example: "1"
 *     responses:
 *       '200':
 *         description: Success
 */

/**
 * @swagger
 * /user/edit:
 *   post:
 *     summary: user
 *     description: user_edit
 *     tags: [user]
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
 *               firstName:
 *                 type: string
 *                 description: first name
 *                 example: "example text"
 *               lastName:
 *                 type: string
 *                 description: last name
 *                 example: "example text"
 *               email:
 *                 type: string
 *                 description: email
 *                 example: "example text"
 *               phoneNumber:
 *                 type: number
 *                 description: phone number
 *                 example: "0760358784"
 *               password:
 *                 type: string
 *                 description: password
 *                 example: "example text"
 *               role:
 *                 type: number
 *                 description: role
 *                 example: "1"
 *     responses:
 *       '200':
 *         description: Success
 */

/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: user
 *     description: user_list
 *     tags: [user]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 */

/**
 * @swagger
 * /user/view:
 *   post:
 *     summary: user
 *     description: user_view
 *     tags: [user]
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

// /**
// * @swagger
// * /user/forget/password:
// *   post:
// *     summary: user
// *     description: user_forget_password
// *     tags: [user]
// *     requestBody:
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *             type: object
// *             properties:
// *               email:
// *                 type: string
// *                 description: E-mail
// *                 example: "sample@example.com"
// *     responses:
// *       '200':
// *         description: Success
// */

// /**
//  * @swagger
//  * /user/password/change:
//  *   post:
//  *     summary: user
//  *     description: user_reset_password
//  *     tags: [user]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               id:
//  *                 type: number
//  *                 description: id
//  *                 example: "1"
//  *               password:
//  *                 type: string
//  *                 description: password
//  *                 example: "example text"
//  *               tempKey:
//  *                 type: string
//  *                 description: tempKey
//  *                 example: "example text"
//  *     responses:
//  *       '200':
//  *         description: Success
//  */

