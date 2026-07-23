import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    // _id of the specific item inside order.items that this review is for
    orderItem: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
    },

    // Snapshot so the review still displays correctly even if the menu item is edited/removed later
    foodName: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true },
);

// A customer can only leave one review per ordered item
reviewSchema.index({ customer: 1, orderItem: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
