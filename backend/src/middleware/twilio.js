import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

const sendOtp = async (phone, otp) => {
    try {
        const message = await client.messages.create({
            body: `Your OTP is ${otp}. This OTP is sent from Apna Dukaan. It is valid for 10 minutes. Do not share it with anyone.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });
        console.log("Otp Sent.", message.sid);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
};

export { sendOtp }