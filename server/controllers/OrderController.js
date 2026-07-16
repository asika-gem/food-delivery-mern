import Order from "../models/Order.js";
import Restaurant from "../models/Restaurant.js";
import User from "../models/UserModel.js";

// @desc Get restaurant owner's orders
// @route GET /api/orders/owner
// @access Owner

export const getOwnerOrders = async (req, res) => {
  try {
    // Find owner's restaurant
    const restaurant = await Restaurant.findOne({
      owner: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const orders = await Order.find({
      restaurant: restaurant._id,
    })
      .populate("customer", "name phone address")
      .populate("rider", "name phone")
      .populate("restaurant", "name")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
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

// @desc Update order status
// @route PUT /api/orders/:id/status
// @access Owner

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check owner permission

    const restaurant = await Restaurant.findById(order.restaurant);

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Assign rider to order
// @route PUT /api/orders/:id/assign-rider
// @access Owner

export const assignRider = async (req, res) => {
  try {
     console.log("Assign Rider API called");
    const { riderId } = req.body;

    const order = await Order.findById(req.params.id);
 console.log("Order found:", order);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check owner permission
    const restaurant = await Restaurant.findById(order.restaurant);

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Find rider
    const rider = await User.findOne({
      _id: riderId,
      role: "rider",
    });

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }

    // Rider must be online
    if (!rider.available) {
      return res.status(400).json({
        success: false,
        message: "Rider is currently offline.",
      });
    }

    // Rider already has another delivery
    if (rider.currentOrder) {
      return res.status(400).json({
        success: false,
        message: "Rider is already assigned to another order.",
      });
    }

    // Assign rider
    order.rider = rider._id;
    order.status = "waiting for pickup";

    await order.save();
    return res.status(200).json({
      success: true,
      message: "Delivery request sent to rider.",
      order,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Rider Accept Delivery
// @route PUT /api/orders/:id/accept
// @access Rider

export const acceptOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.rider) {
      return res.status(400).json({
        success: false,
        message: "No rider assigned.",
      });
    }

    if (order.rider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (order.status !== "waiting for pickup") {
      return res.status(400).json({
        success: false,
        message: "This request is no longer available.",
      });
    }

    const rider = await User.findById(req.user._id);

    rider.available = false;
    rider.currentOrder = order._id;

    order.status = "picked";

    await rider.save();
    await order.save();

    res.status(200).json({
      success: true,
      message: "Delivery accepted.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Rider Reject Delivery
// @route PUT /api/orders/:id/reject
// @access Rider

export const rejectOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.rider) {
      return res.status(400).json({
        success: false,
        message: "No rider assigned.",
      });
    }

    if (order.rider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    order.rider = null;
    order.status = "ready";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Delivery rejected.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Create a new order
// @route POST /api/orders
// @access Customer
export const createOrder = async (req, res) => {
  try {
    const { restaurant, items, totalAmount, address, phone } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const order = await Order.create({
      customer: req.user._id,
      restaurant,
      items,
      totalAmount,
      address,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// @desc Get customer's orders
// @route GET /api/orders/my-orders
// @access Customer
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user._id,
      isArchived: false,
    })
      .populate("restaurant", "name profileImage")
      .sort({ createdAt: -1 });

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
// @desc Cancel Order
// @route PUT /api/orders/:id/cancel
// @access Customer

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only the customer who placed the order can cancel it
    if (order.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Prevent cancelling after preparation starts
    if (["preparing", "ready", "picked", "delivered"].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled.",
      });
    }

    order.status = "cancelled";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getRiderOrders = async (req, res) => {
  try {
    console.log("Logged in rider:", req.user._id);

    const orders = await Order.find({
      rider: req.user._id,
    })
      .populate("customer", "name phone address")
      .populate("restaurant", "name");

    console.log("Orders:", orders);

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
  }
};

export const markDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.rider) {
      return res.status(400).json({
        success: false,
        message: "No rider assigned.",
      });
    }

    if (order.rider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    order.status = "delivered";
    await order.save();

    // Free the rider
    const rider = await User.findById(req.user._id);

    rider.currentOrder = null;
    rider.available = true;

    await rider.save();

    res.json({
      success: true,
      message: "Order delivered successfully.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// @desc Archive Order
// @route PUT /api/orders/:id/archive
// @access Customer
export const archiveOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Customer can archive only their own order
    if (order.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    order.isArchived = true;

    await order.save();

    res.json({
      success: true,
      message: "Order removed from history",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};