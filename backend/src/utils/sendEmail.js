import nodemailer from "nodemailer";

const sendMail = async(email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_PORT === 465,
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        })

        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: subject,
            text: text
        })

        console.log('email sent successfully')
    } catch (error) {
        console.log(`Error in senging message: ${error}`)
    }
}

export default sendMail;