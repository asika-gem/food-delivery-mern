import express from "express";
import { registerUser,loginUser, getCurrentUser, getProfile } from "../controllers/authController.js";
import { registerValidation,loginValidation } from "../middleware/authValidator.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.get("/me", protect, getCurrentUser);
router.get("/profile", protect, getProfile);
export default router;