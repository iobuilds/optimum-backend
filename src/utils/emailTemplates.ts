const userCreate = (name:string, email:string, password:string):string=>{
    return `<html>
    <head>
        <title>Optimum Developers</title>
    </head>
    <body>
        <p>Dear ${name},</p>
        <p>Your account has been created successfully.</p>
        <p>Below are your login credentials:</p>
        <ul>
            <li>Email: ${email}</li>
            <li>Password: ${password}</li>
        </ul>
        <p>You can login to your account using the credentials above.</p>
        <p>Thank you</p>
    </body>
    </html>`;
}
const change_password_email = (name:string, link:string):string=>{
    return `<html>
    <head>
        <title>Optimum Developers</title>
        <style>
            .button {
                display: inline-block;
                border-radius: 4px;
                background-color: #4CAF50;
                border: none;
                color: white;
                text-align: center;
                font-size: 16px;
                padding: 10px;
                width: 100%;
                transition: all 0.5s;
                cursor: pointer;
            }

            .button span {
                cursor: pointer;
                display: inline-block;
                position: relative;
                transition: 0.5s;
            }

            .button span:after {
                content: '»';
                position: absolute;
                opacity: 0;
                top: 0;
                right: -20px;
                transition: 0.5s;
            }

            .button:hover span {
                padding-right: 30px;
            }

            .button:hover span:after {
                opacity: 1;
                right: 0;
            }
        </style>
    </head>
    <body>
        <p>Dear ${name},</p>
        <p>Please click the button to change your password.</p>
        <p><a href="${link}" class="button"><span>Change Password</span></a></p>
        <p>If the button is not working, please click on the following link to change your password: <a href="${link}">${link}</a></p>
        <p>Thank you</p>
    </body>
    </html>`;
}

const contactFormEmail = (
    name: string,
    email: string,
    phone: string,
    serviceType: string,
    message: string
): string => {
    return `<html>
    <head>
        <title>New Contact Form Submission - Optimum Developers</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                border: 1px solid #ddd;
                padding: 20px;
                border-radius: 6px;
                background-color: #fafafa;
            }
            h2 {
                color: #4CAF50;
            }
            .detail {
                margin-bottom: 10px;
            }
            .label {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>New Contact Form Submission</h2>
            <p>You have received a new inquiry from your website contact form:</p>
            <div class="detail"><span class="label">Name:</span> ${name}</div>
            <div class="detail"><span class="label">Email:</span> ${email}</div>
            <div class="detail"><span class="label">Phone:</span> ${phone}</div>
            <div class="detail"><span class="label">Service Type:</span> ${serviceType}</div>
            <div class="detail"><span class="label">Message:</span><br/> ${message}</div>
            <hr/>
            <p><small>This message was sent automatically from Optimum Developers contact form.</small></p>
        </div>
    </body>
    </html>`;
};

export default{
    userCreate,
    change_password_email,
    contactFormEmail
}