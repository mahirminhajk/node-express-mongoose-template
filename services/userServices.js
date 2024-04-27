import { User } from "../models/index.js";

export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};
