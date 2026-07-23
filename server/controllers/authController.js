import User from "../models/UserModel.js";
import generateToken from "../utils/token.js";
import { validationResult } from "express-validator";
import Menu from "../models/MenuItem.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, password, phone, role } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role,
    });

    // Generate JWT
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// @desc Get Logged In User
// @route GET /api/auth/profile
// @access Private

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      favorites: user.favorites || [],
    });
  } catch (error) {
    console.error("Get favorites error:", error);

    res.status(500).json({
      message: "Failed to fetch favorites",
    });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const { menuId } = req.params;

    // Check if menu exists
    const menu = await Menu.findById(menuId);

    if (!menu) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    // Find logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Remove old null/invalid values
    user.favorites = user.favorites.filter(
      (id) => id !== null && id !== undefined,
    );

    // Check if already favorite
    const favoriteIndex = user.favorites.findIndex(
      (id) => id.toString() === menuId,
    );

    // REMOVE FAVORITE
    if (favoriteIndex !== -1) {
      user.favorites.splice(favoriteIndex, 1);

      await user.save();

      return res.status(200).json({
        message: "Removed from favorites",
        isFavorite: false,
      });
    }

    // ADD FAVORITE
    user.favorites.push(menuId);

    await user.save();

    return res.status(200).json({
      message: "Added to favorites",
      isFavorite: true,
    });
  } catch (error) {
    console.error("Toggle favorite error:", error);

    return res.status(500).json({
      message: "Failed to update favorite",
      error: error.message,
    });
  }
};