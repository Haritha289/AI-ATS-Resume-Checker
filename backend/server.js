const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const env = require("./src/config/env");
const { connectDB } = require("./src/config/db");
const { notFound, errorHandler } = require("./src/middleware/errorHandler");
const healthRouter = require("./src/routes/health");
const authRouter = require("./src/routes/auth");
const resumesRouter=require("./src/routes/resumes");
const dashboardRouter = require("./src/routes/dashboard");
const insightsRouter=require("./src/routes/insights");
const versionsRouter = require("./src/routes/versions");
const historyRouter = require("./src/routes/history");
const app = express();


app.set("trust proxy", 1);

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());


if (!env.isProd) {
    app.use(morgan("dev"));
}

app.use("/api/health", healthRouter);
app.use("/api/auth",authRouter);
app.use("/api/resumes",resumesRouter);
app.use("/api/dashboard",dashboardRouter);
app.use("/api/insights",insightsRouter);
app.use("/api/versions",versionsRouter);
app.use("/api/history",historyRouter);


app.use(notFound);
app.use(errorHandler);

async function start() {
    try {
        await connectDB();

        app.listen(env.port, () => {
            console.log(`Server listening on http://localhost:${env.port} (${env.nodeEnv})`);
        });
    } catch (err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
}

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled rejection:", reason);
});

start();

module.exports = app;