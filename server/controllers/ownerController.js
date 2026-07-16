// controllers/ownerController.js

import Restaurant from "../models/RestaurantModel.js";

export const getOwnerDashboard = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      owner: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "No restaurant found.",
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
