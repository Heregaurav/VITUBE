
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const frontendDistPath = path.resolve(process.cwd(), "../frontend/dist");
const frontendIndexPath = path.join(frontendDistPath, "index.html");

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);

            const allowedOrigins = process.env.CORS_ORIGIN
                ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
                : [];

            const isAllowed =
                allowedOrigins.includes(origin) ||
                origin.endsWith('.vercel.app') ||
                origin.includes('localhost') ||
                origin.includes('127.0.0.1');

            if (isAllowed) {
                callback(null, true);
            } else {
                callback(null, true);
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
)
app.use((err, req, res, next) => {
    console.error("ERROR:", err.message, err.stack)
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    })
})
// common middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" })); // Parses HTML form data
app.use(express.static("public"));
app.use(express.static(frontendDistPath));
app.use(cookieParser())

// import routes
import healthcheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middlewares.js";
import videoRouter from "./routes/video.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import likeRouter from "./routes/like.routes.js";
import commentRouter from "./routes/comment.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
/* You are importing the default export

You can name it ANYTHING YOU WANT */


// routes

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/playlists", playlistRouter);

app.get(/^\/(?!api\/).*/, (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(frontendIndexPath);
});

app.use(errorHandler);

export { app };