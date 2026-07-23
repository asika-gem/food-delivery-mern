import mongoose from "mongoose";
import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Restaurant from "../models/Restaurant.js";

// Recalculate a restaurant's average rating + review count from its reviews.
// Called any time a review is created, edited, or deleted.
const recalcRestaurantRating = async (restaurantId) => {
  const stats = await Review.aggregate([
    { $match: { restaurant: new mongoose.Types.ObjectId(restaurantId) } },
    {
      $group: {
        _id: "$restaurant",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  const rating = stats.length ? Math.round(stats[0].avgRating * 10) / 10 : 0;
  const numReviews = stats.length ? stats[0].count : 0;

  await Restaurant.findByIdAndUpdate(restaurantId, { rating, numReviews });
};

// @desc Get delivered order items that don't have a review yet
// @route GET /api/reviews/pending
// @access Customer
export const getPendingReviews = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user._id,
      status: "delivered",
    }).populate("restaurant", "name profileImage");

    const orderIds = orders.map((o) => o._id);

    const reviewedItemIds = new Set(
      (
        await Review.find({
          customer: req.user._id,
          order: { $in: orderIds },
        }).select("orderItem")
      ).map((r) => r.orderItem.toString()),
    );

    const pending = [];

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!reviewedItemIds.has(item._id.toString())) {
          pending.push({
            orderId: order._id,
            orderItemId: item._id,
            restaurantId: order.restaurant?._id,
            restaurantName: order.restaurant?.name || "Restaurant",
            restaurantImage: order.restaurant?.profileImage || "",
            foodName: item.name,
            menuItem: item.menu,
            price: item.price,
            quantity: item.quantity,
            orderDate: order.createdAt,
          });
        }
      });
    });

    pending.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    res.status(200).json({
      success: true,
      pending,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Create a review for a delivered order item
// @route POST /api/reviews
// @access Customer
export const createReview = async (req, res) => {
  try {
    const { orderId, orderItemId, rating, comment } = req.body;

    if (!orderId || !orderItemId || !rating) {
      return res.status(400).json({
        success: false,
        message: "orderId, orderItemId and rating are required.",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (order.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    if (order.status !== "delivered") {
      return res.status(400).json({
        success: false,
        message: "You can only review items from delivered orders.",
      });
    }

    const item = order.items.id(orderItemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Order item not found.",
      });
    }

    const review = await Review.create({
      customer: req.user._id,
      restaurant: order.restaurant,
      order: order._id,
      orderItem: item._id,
      menuItem: item.menu || null,
      foodName: item.name,
      rating,
      comment: comment || "",
    });

    await recalcRestaurantRating(order.restaurant);

    res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      review,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this item.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get the logged-in customer's own reviews
// @route GET /api/reviews/my
// @access Customer
export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ customer: req.user._id })
      .populate("restaurant", "name profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Edit a review
// @route PUT /api/reviews/:id
// @access Customer
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    if (review.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    if (rating !== undefined) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5.",
        });
      }
      review.rating = rating;
    }

    if (comment !== undefined) {
      review.comment = comment;
    }

    await review.save();
    await recalcRestaurantRating(review.restaurant);

    res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Delete a review
// @route DELETE /api/reviews/:id
// @access Customer
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    if (review.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const restaurantId = review.restaurant;

    await review.deleteOne();
    await recalcRestaurantRating(restaurantId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get all reviews for a restaurant (public - used on restaurant page / owner dashboard)
// @route GET /api/reviews/restaurant/:id
// @access Public
export const getRestaurantReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.id })
      .populate("customer", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
