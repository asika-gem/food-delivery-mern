import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { getOwnerDashboard } from "../controllers/ownerController.js";

const router = express.Router();

router.get("/dashboard", protect, authorize("owner"), getOwnerDashboard);

export default router;
