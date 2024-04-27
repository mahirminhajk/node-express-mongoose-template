import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import helmet from 'helmet'
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from 'express-rate-limit'
import { connectDB } from "./config/index.js";
import { createErr, errorLogger, infoLogger } from "./utils/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//* middleware express
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'deployment') {
    app.use(rateLimit({
        windowMs: 8 * 60 * 1000, // 8 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    }));
} else {
    app.use(morgan("dev"));
}

if (process.env.NODE_ENV === 'development') {
    app.get("/test", (req, res) => {
        const id = errorLogger("Hello World - this is a error message", "This is a stack trace");
        console.log(id);
        const err = createErr(500, "Hello World - this is a error message", id);
        res.send(err);
    });
}

//* Error handler
app.use((err, req, res, next) => {
    const errorId = errorLogger(err.message, err.stack);
    err.id = errorId;
    res.status(500).json(err);
});


app.listen(PORT, async () => {
    console.log("Server is running on port 3000 🟢".underline.blue);
    await connectDB();
}
);