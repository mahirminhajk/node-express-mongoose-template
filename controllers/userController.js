import { createUser } from "../services/index.js";
import { createErr, errorLogger } from "../utils/index.js";

const createUserController = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await createUser(userData);

        res.status(201).json(user);

    } catch (error) {
        const errorId = errorLogger(error.message, error.stack);
        next(createErr(500, error.message, errorId));
    }
};

export { createUserController };