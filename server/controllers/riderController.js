import User from "../models/UserModel.js";
import Order from "../models/Order.js";

// @desc Toggle Rider Availability
// @route PUT /api/rider/availability
// @access Rider
export const toggleAvailability = async (req, res) => {
  try {
    const rider = await User.findById(req.user._id);

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }

    rider.available = !rider.available;

    await rider.save();

    res.status(200).json({
      success: true,
      available: rider.available,
      message: rider.available ? "You are now Online" : "You are now Offline",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get Rider Dashboard Stats
// @route GET /api/rider/dashboard
// @access Rider
export const getRiderDashboard = async (req, res) => {
  try {
    const totalDeliveries = await Order.countDocuments({
      rider: req.user._id,
    });

    const activeDeliveries = await Order.countDocuments({
      rider: req.user._id,
      status: "picked",
    });

    const deliveredOrders = await Order.countDocuments({
      rider: req.user._id,
      status: "delivered",
    });

    const rider = await User.findById(req.user._id);

    res.json({
      success: true,
      stats: {
        totalDeliveries,
        activeDeliveries,
        deliveredOrders,
        available: rider.available,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get Assigned Orders
// @route GET /api/rider/orders
// @access Rider
export const getAssignedOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      rider: req.user._id,
    })
      .populate("customer", "name phone address")
      .populate("restaurant", "name")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get Available Riders
// @route GET /api/rider/available
// @access Owner
export const getAvailableRiders = async (req, res) => {
  try {
    const riders = await User.find({
      role: "rider",
      available: true,
      currentOrder: null,
    }).select("-password");

    res.json({
      success: true,
      riders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
