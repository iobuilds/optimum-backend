"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var contact_controller_1 = __importDefault(require("../../controllers/contact.controller"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.post('/submit', contact_controller_1.default.createContact);
exports.default = router;
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
//# sourceMappingURL=contact.route.js.map