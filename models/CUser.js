import { Schema, model } from "mongoose";

const CUserSchema = new Schema({
    name: {
        type: String,
        min: [3, "Name must be at least 3 characters, got {VALUE}"],
        max: 255
    },
    username: {
        type: String,
        unique: [true, "Username already exists"],
        min: [3, "Username must be at least 3 characters, got {VALUE}"],
        max: 255
    },
    email: {
        type: String,
        unique: [true, "Email already exists, please login"],
        max: 255
    },
    phoneNo: {
        type: String,
        unique: [true, "Phone number already exists, please login"],
        max: 255
    },
    password: {
        type: String,
        min: [8, "Password must be at least 6 characters"],
        max: 255
    },
    status: {
        type: String,
        enum: ["setup_profile", "show_city", "done"],
        default: "setup_profile"
    },
    logs: [{
        action: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            required: true
        }
    }],
}, { timestamps: true });

export default model("CUser", CUserSchema);