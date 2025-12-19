const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../.env' }); // Load server .env

const sendTestEmail = async () => {
    try {
        console.log("Checking credentials...");
        console.log("Service:", process.env.EMAIL_SERVICE);
        console.log("User:", process.env.EMAIL_USER);

        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        console.log("Sending email...");
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_USER, // Send to self
            subject: "Test Email from Debug Script",
            text: "If you see this, email service is working."
        });

        console.log("Success! Message ID:", info.messageId);
    } catch (error) {
        console.error("Email Failed:", error);
    }
};

sendTestEmail();
