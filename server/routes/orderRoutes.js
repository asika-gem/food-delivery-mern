import express from "express";
import {
  createOrder,
  getMyOrders,
  getOwnerOrders,
  updateOrderStatus,
  assignRider,
  getRiderOrders,
  markDelivered,
  cancelOrder,
  archiveOrder,
  acceptOrder,
  rejectOrder,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer
router.post("/", protect, createOrder);
router.put("/:id/cancel", protect, cancelOrder);
router.get("/my", protect, getMyOrders);
router.put("/:id/archive", protect, archiveOrder);


// Owner
router.get("/owner", protect, getOwnerOrders);

router.put("/:id/status", protect, updateOrderStatus);

router.put("/:id/assign-rider", protect, assignRider);

// Rider
router.get("/rider", protect, getRiderOrders);

router.put("/:id/delivered", protect, markDelivered);

router.put("/:id/accept", protect, acceptOrder);

router.put("/:id/reject", protect, rejectOrder);

export default router;
