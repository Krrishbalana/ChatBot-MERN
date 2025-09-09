import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./src/routes/user.routes.js";
import chatRoutes from "./src/routes/chat.routes.js";

import { config } from "dotenv";
config();

const app = express();

// Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://chat-bot-mern.vercel.app",
];

// Middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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
