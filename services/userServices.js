import { User } from "../models/index.js";

export const createUser = async (userData) => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (error) {
        throw error;
    }
};
