import express from "express";

import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  getMyRestaurant,
} from "../controllers/restaurantController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router= express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  createRestaurant
);

router.get("/", getRestaurants);
router.get("/my", protect, getMyRestaurant);
router.get("/:id", getRestaurantById);

router.put(
  "/:id",

  (req, res, next) => {
    console.log("Before Multer");
    next();
  },
  protect,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  (req, res, next) => {
    console.log("After Multer");
    console.log("Body:", req.body);
    console.log("Files:", req.files);
    next();
  },
  updateRestaurant,
);

router.delete("/:id", protect, deleteRestaurant);

export default router;
