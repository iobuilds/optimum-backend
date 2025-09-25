import DefaultResponse from "../utils/DefaultResponse";
import logger from '../config/logger';
import {ContactInput} from "../config/types/contact";
import emailFunction from "../utils/email";
import emailTemplates from "../utils/emailTemplates";
import config from './../config/config';


const contactService = async (data: ContactInput) => {
    try {
        // Build email body using your template
        const emailBody = emailTemplates.contactFormEmail(
            data.name,         // Name
            data.email,        // Email
            data.phone,        // Phone
            data.service_type, // Service type
            data.message       // Message
        );

        // Send email (to admin/support team)
        const sendMail = await emailFunction.emailSend(
            "support@optimumdevelopers.com", // ✅ recipient (your email to receive contact form)
            "New Contact Form Submission - Optimum Developers", // ✅ subject
            emailBody // ✅ HTML content
        );

        if (!sendMail) {
            return DefaultResponse.errorFormat("000", "Couldn't send email");
        }

        return DefaultResponse.successFormat("200", "Contact form submitted successfully");

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500", "Internal server error");
    }
};

export default {
    contactService
}