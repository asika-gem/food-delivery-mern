
import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Clock3,
  CheckCircle,
  User,
  ArrowRight,
} from "lucide-react";

import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my");

      setOrders(res.data.orders || []);
    } catch (error) {
      console.log("Failed to fetch orders:", error);
    }
  };

  // =========================
  // ORDER STATISTICS
  // =========================

  const pendingOrders = orders.filter(
    (order) =>
      order.status !== "delivered" &&
      order.status !== "cancelled",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered",
  ).length;

  const progress =
    orders.length === 0
      ? 0
      : (deliveredOrders / orders.length) * 100;

  return (
    <>
      {/* =========================
          HERO SECTION
      ========================= */}

      <div className="mb-8 rounded-3xl border-l-8 border-orange-500 bg-white p-8 shadow-xl">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome Back, {currentUser?.name} 👋
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your orders and track deliveries.
        </p>
      </div>

      {/* =========================
          STATISTICS
      ========================= */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {/* Total Orders */}

        <div className="group rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <ShoppingBag
              className="text-orange-500"
              size={42}
            />

            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
              Orders
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-bold">
            {orders.length}
          </h2>

          <p className="mt-2 text-gray-500">
            Total Orders
          </p>
        </div>

        {/* Pending Orders */}

        <div className="group rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <Clock3
              className="text-yellow-500"
              size={42}
            />

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-600">
              Active
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-bold">
            {pendingOrders}
          </h2>

          <p className="mt-2 text-gray-500">
            Pending Orders
          </p>
        </div>

        {/* Delivered Orders */}

        <div className="group rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <CheckCircle
              className="text-green-500"
              size={42}
            />

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-600">
              Delivered
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-bold">
            {deliveredOrders}
          </h2>

          <p className="mt-2 text-gray-500">
            Successfully Delivered
          </p>
        </div>

        {/* Profile */}

        <div
          onClick={() => navigate("/customer/profile")}
          className="group cursor-pointer rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <User
              className="text-blue-500"
              size={42}
            />

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
              Profile
            </span>
          </div>

          <h2 className="mt-6 text-2xl font-bold">
            {currentUser?.name}
          </h2>

          <p className="mt-2 text-gray-500">
            Customer Account
          </p>
        </div>
      </div>

      {/* =========================
          ORDER PROGRESS
      ========================= */}

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Delivery Progress
          </h2>

          <span className="font-semibold text-green-600">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-linear-to-r from-green-400 to-green-600 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-3 text-sm text-gray-500">
          {deliveredOrders} of {orders.length} orders completed.
        </p>
      </div>

      {/* =========================
          RECENT ORDERS
      ========================= */}

      <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Recent Orders
            </h2>

            <p className="text-gray-500">
              Your latest food orders
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/customer/orders")}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2 font-medium text-white transition hover:bg-orange-600"
          >
            View All

            <ArrowRight size={18} />
          </button>
        </div>

        {/* No Orders */}

        {orders.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <ShoppingBag
              size={70}
              className="text-gray-300"
            />

            <h2 className="mt-6 text-2xl font-bold text-gray-700">
              No Orders Yet
            </h2>

            <p className="mt-2 text-center text-gray-500">
              Looks like you haven't placed your first order.
              <br />
              Start exploring delicious restaurants 🍕🍔
            </p>
          </div>
        ) : (

          /* Recent Orders List */

          <div className="space-y-5">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl md:flex-row md:items-center md:justify-between"
              >
                {/* Restaurant */}

                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {order.restaurant?.name ||
                      "Restaurant"}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {order.createdAt
                      ? new Date(
                          order.createdAt,
                        ).toLocaleDateString()
                      : ""}
                  </p>
                </div>

                {/* Status */}

                <div>
                  <span
                    className={`rounded-full px-5 py-2 text-sm font-semibold ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Price */}

                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    Total Amount
                  </p>

                  <h2 className="text-2xl font-bold text-orange-600">
                    Rs. {order.totalAmount}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerDashboard;
