import nodemailer from "nodemailer";
import config from "./../config/config";

const emailSend = async function email(toEmail: string, subject: string, message: string): Promise<boolean> {
    try {
        let transporter = nodemailer.createTransport({
            host: config.email.smtp.host!,
            port: Number(config.email.smtp.port!),
            secure: true,
            auth: {
                user: config.email.smtp.auth.user!,
                pass: config.email.smtp.auth.pass!,
            },
        });

        try {
            let response = await transporter.sendMail({
                from: `<${config.email.from}>`,
                to: toEmail,
                subject: subject,
                html: message,
            });

            if (response.accepted.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};


export default {
    emailSend,
};