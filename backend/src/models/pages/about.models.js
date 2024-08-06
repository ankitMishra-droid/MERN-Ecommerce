import mongoose, { Schema } from "mongoose";

const aboutModal = new Schema({
    heading: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})