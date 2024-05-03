import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        min: [3, "Name must be at least 3 characters, got {VALUE}"],
        max: 255
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop"
    },
    status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending"
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

export default model("Product", ProductSchema);