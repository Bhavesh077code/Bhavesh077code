
import express from "express";
import { createEvent } from "../controller/eventController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
    "/event",
    authMiddleware,
    adminOnly,
    upload.single("image"),
    createEvent
);


export default router;


