import jwt from "jsonwebtoken";
import { User } from "../module/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No valid Bearer token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Auth Error:", error);

    return res.status(401).json({
      success: false,
      message: error.message || "Token verification failed",
    });
  }
};

export default authMiddleware;