import express from "express";

import {
  createReview,
  getMyReviews,
  updateReview,
  deleteReview,
  getPendingReviews,
  getRestaurantReviews,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/pending", protect, getPendingReviews);
router.get("/my", protect, getMyReviews);
router.get("/restaurant/:id", getRestaurantReviews);

router.post("/", protect, createReview);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

export default router;
