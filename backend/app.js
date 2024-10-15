import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// import routes
import healthCheckRoutes from "./routes/healthCheck.routes.js";
import authRoutes from "./routes/auth.routes.js";

// define routes
app.use("/api/v1/healthCheck", healthCheckRoutes);
app.use("/api/v1/auth", authRoutes);

// error handler
import { ApiErrorResponse } from "./utils/handleApiResponse.js";

app.use((err, req, res, next) => {
    console.log(err);
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res
        .status(errorStatus)
        .json(new ApiErrorResponse(errorStatus, errorMessage, err?.errors, err?.stack, false));
});

export default app;
