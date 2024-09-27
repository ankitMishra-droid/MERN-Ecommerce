import { asyncHandler } from "../../utils/asyncHandler.js";
import sendMail from "../../utils/sendEmail.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const contact = asyncHandler(async (req, res) => {
    try {
        const {name, email, contact, message} = req.body;

        if(!name){
            throw new Error("Name is required")
        }
        if(!email){
            throw new Error("Email is required")
        }
        if(!contact){
            throw new Error("Contact is required")
        }
        if(!message){
            throw new Error("Message is required")
        }

        await sendMail(email, `Contact Query from: ${name}`, `Name: ${name}\nEmail: ${email}\nContact Number: ${contact}\nMessage: ${message}`)

        return res.status(201).json(
            {
                message: "Contact Form Submitted."
            }
        )
    } catch (error) {
        return res.status(500).json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
})

export { contact }