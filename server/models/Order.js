import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
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

    items: [
      {
        menu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },

        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "waiting for pickup",
        "picked",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    address: {
      type: String,
      required: true,
    },
    
    isArchived: {
      type: Boolean,
      default: false,
    },

    phone: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);
