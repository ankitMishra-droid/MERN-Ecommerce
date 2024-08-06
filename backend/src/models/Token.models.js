import mongoose, {Schema} from "mongoose"
import { User } from "../models/UserModel.js"

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
export const Token = mongoose.model("token", tokenSchema);