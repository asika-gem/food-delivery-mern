import express from "express";
import {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
  getMyMenus,
  getRestaurantMenu,
} from "../controllers/menuController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createMenu);

router.get("/", getMenus);
router.get("/my", protect, getMyMenus);


router.get("/restaurant/:restaurantId", getRestaurantMenu);
router.get("/:id", getMenuById);
router.put("/:id", protect, upload.single("image"), updateMenu);

router.delete("/:id", protect, deleteMenu);

export default router;
