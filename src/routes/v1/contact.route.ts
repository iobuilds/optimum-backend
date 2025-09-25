import controller from '../../controllers/contact.controller';
import express from 'express';
import { Router } from 'express';
import {authenticate} from '../../middlewares/authenticate';
const router: Router = express.Router();
router.post('/submit', controller.createContact);


export default router;

/**
 * @swagger
 * tags:
 *   name: contact
 *   description: Contact form management
 */

/**
 * @swagger
 * /contact/submit:
 *   post:
 *     summary: Submit contact form
 *     description: Submit a new contact form entry
 *     tags: [contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 description: Phone number of the user
 *                 example: "0760358784"
 *               service_type:
 *                 type: string
 *                 description: Type of service the user is interested in
 *                 example: "House Construction"
 *               message:
 *                 type: string
 *                 description: Message from the user
 *                 example: "I would like to discuss my new house project."
 *     responses:
 *       '200':
 *         description: Success
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */