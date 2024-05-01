import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import helmet from 'helmet'
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from 'express-rate-limit'
import { connectDB } from "./config/index.js";
import { userRouter } from "./routers/index.js";
import createCacheMiddleware from "./middlewares/createCacheMiddleware.js";

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

    const cacheMiddleware = createCacheMiddleware();

    app.get("/test", cacheMiddleware, (req, res) => {
        // const id = errorLogger("Hello World - this is a error message", "This is a stack trace");
        // console.log(id);
        // const err = createErr(500, "Hello World - this is a error message", id);
        // res.send(err);
        //* wati three seconds
        console.log("hello");
        //* wait three seconds
        setTimeout(() => {
            res.send("world");
        }, 3000);
    });
}

//* Routes
app.use("/api/v1/user", userRouter);

//* Error handler
app.use((err, req, res, next) => {
    res.status(500).json(err);
});


app.listen(PORT, async () => {
    console.log("Server is running on port 3000 🟢".underline.blue);
    await connectDB();
}
);