
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import riderRoutes from "./routes/riderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Food Delivery API is running 🚀",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/rider", riderRoutes);
app.use("/api/reviews", reviewRoutes);
const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
