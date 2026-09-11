import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import createAdmin from "./utils/createAdmin.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


app.use("/user", userRoutes);
app.use("/create", eventRoutes);


connectDB();
createAdmin();





app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


