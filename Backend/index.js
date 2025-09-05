import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user-routes.js";
import chatRoutes from "./routes/chat-routes.js";

import { config } from "dotenv";
config();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev")); // for development

// Routes
app.use("/api/user/", userRoutes);
app.use("/api/chat/", chatRoutes);

// Connections and Listeners
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `✅ Server started on port ${
          process.env.PORT || 5000
        } and MongoDB is connected`
      );
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
