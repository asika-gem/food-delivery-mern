import express from "express";
import {
  toggleAvailability,
  getRiderDashboard,
  getAssignedOrders,
  getAvailableRiders,
} from "../controllers/riderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rider
router.put("/availability", protect, toggleAvailability);

router.get("/dashboard", protect, getRiderDashboard);

router.get("/orders", protect, getAssignedOrders);

// Owner
router.get("/available", protect, getAvailableRiders);

export default router;
