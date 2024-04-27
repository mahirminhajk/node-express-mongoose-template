import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
}, { timestamps: true });

export default model("User", userSchema);