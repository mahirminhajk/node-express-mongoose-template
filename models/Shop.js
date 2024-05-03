import { Schema, model } from "mongoose";

const ShopSchema = new Schema({
    name: {
        type: String,
        min: [3, "Name must be at least 3 characters, got {VALUE}"],
        max: 255
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "BUser"
    },
    status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending"
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
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

export default model("Shop", ShopSchema);