import { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Package,
  Store,
  MapPin,
  Phone,
  Receipt,
} from "lucide-react";

import { api } from "../../services/api";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import customerMenu from "../../components/dashboard/customerMenu";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-orange-100 text-orange-700",
  ready: "bg-purple-100 text-purple-700",
  picked: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusIcon = {
  pending: <Clock size={18} />,
  confirmed: <CheckCircle size={18} />,
  preparing: <Package size={18} />,
  ready: <Package size={18} />,
  picked: <Truck size={18} />,
  delivered: <CheckCircle size={18} />,
  cancelled: <XCircle size={18} />,
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // ==============================
  // FETCH ORDERS
  // ==============================
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await api.get("/orders/my");

      setOrders(res.data.orders || []);
    } catch (err) {
      console.log("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // CANCEL ORDER
  // ==============================
  const cancelOrder = async (id) => {
    const ok = window.confirm("Are you sure you want to cancel this order?");

    if (!ok) return;

    try {
      await api.put(`/orders/${id}/cancel`);

      await fetchOrders();

      alert("Order cancelled successfully.");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Unable to cancel the order.");
    }
  };

  // ==============================
  // ARCHIVE CANCELLED ORDER
  // ==============================
  const archiveOrder = async (id) => {
    const ok = window.confirm("Remove this cancelled order from your history?");

    if (!ok) return;

    try {
      await api.put(`/orders/${id}/archive`);

      await fetchOrders();

      alert("Order removed from history.");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  // ==============================
  // FILTER ORDERS
  // ==============================
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;

    return order.status === filter;
  });

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />

            <p className="mt-4 text-lg font-semibold text-gray-500">
              Loading Orders...
            </p>
          </div>
        </div>
      
    );
  }

  // ==============================
  // NO ORDERS
  // ==============================
  if (orders.length === 0) {
    return (
      
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="w-full max-w-md rounded-3xl bg-white p-12 text-center shadow-xl">
            <Receipt size={70} className="mx-auto text-orange-500" />

            <h2 className="mt-6 text-3xl font-bold text-gray-800">
              No Orders Yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your placed orders will appear here.
            </p>
          </div>
        </div>
      
    );
  }

  // ==============================
  // MAIN PAGE
  // ==============================
  return (
   
      <section className="min-h-screen bg-gray-100 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          {/* PAGE HEADER */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">My Orders</h1>

            <p className="mt-2 text-gray-500">
              Track and manage your food orders.
            </p>
          </div>

          {/* FILTERS */}
          <div className="mb-8 flex flex-wrap gap-3">
            {[
              "all",
              "pending",
              "confirmed",
              "preparing",
              "ready",
              "picked",
              "delivered",
              "cancelled",
            ].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-full px-5 py-2 font-medium capitalize transition ${
                  filter === status
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white text-gray-700 shadow-sm hover:bg-orange-50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* NO FILTERED ORDERS */}
          {filteredOrders.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
              <Receipt size={60} className="mx-auto text-gray-300" />

              <h2 className="mt-5 text-2xl font-bold text-gray-700">
                No {filter} orders
              </h2>

              <p className="mt-2 text-gray-500">
                You don't have any orders with this status.
              </p>

              <button
                onClick={() => setFilter("all")}
                className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                View All Orders
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* ORDERS */}
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="overflow-hidden rounded-3xl bg-white shadow-lg"
                >
                  {/* ==============================
                      ORDER HEADER
                  ============================== */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-orange-50 px-8 py-5">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {order.restaurant?.name || "Restaurant"}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Order ID: {order._id}
                      </p>
                    </div>

                    {/* STATUS */}
                    <div
                      className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm ${
                        statusColor[order.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {statusIcon[order.status]}

                      <span className="capitalize">{order.status}</span>
                    </div>
                  </div>

                  {/* ==============================
                      ORDER BODY
                  ============================== */}
                  <div className="grid gap-8 p-8 lg:grid-cols-3">
                    {/* ==========================
                        ORDER ITEMS
                    ========================== */}
                    <div className="lg:col-span-2">
                      <h3 className="mb-4 text-xl font-bold text-gray-800">
                        Ordered Items
                      </h3>

                      <div className="space-y-4">
                        {order.items?.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:bg-white hover:shadow"
                          >
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                {item.name}
                              </h4>

                              <p className="mt-1 text-sm text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>

                            <h4 className="font-bold text-orange-500">
                              Rs. {item.price * item.quantity}
                            </h4>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ==========================
                        ORDER DETAILS
                    ========================== */}
                    <div className="rounded-2xl bg-gray-50 p-6">
                      <div className="space-y-5">
                        {/* RESTAURANT */}
                        <div className="flex items-start gap-3">
                          <Store className="mt-0.5 text-orange-500" />

                          <div>
                            <p className="text-xs text-gray-400">Restaurant</p>

                            <span className="font-medium text-gray-700">
                              {order.restaurant?.name || "Restaurant"}
                            </span>
                          </div>
                        </div>

                        {/* ADDRESS */}
                        <div className="flex items-start gap-3">
                          <MapPin className="mt-0.5 text-orange-500" />

                          <div>
                            <p className="text-xs text-gray-400">
                              Delivery Address
                            </p>

                            <span className="font-medium text-gray-700">
                              {order.address || "Not available"}
                            </span>
                          </div>
                        </div>

                        {/* PHONE */}
                        <div className="flex items-start gap-3">
                          <Phone className="mt-0.5 text-orange-500" />

                          <div>
                            <p className="text-xs text-gray-400">Contact</p>

                            <span className="font-medium text-gray-700">
                              {order.phone || "Not available"}
                            </span>
                          </div>
                        </div>

                        <hr />

                        {/* TOTAL */}
                        <div className="flex justify-between text-lg">
                          <span className="text-gray-600">Total Amount</span>

                          <span className="font-bold text-orange-500">
                            Rs. {order.totalAmount}
                          </span>
                        </div>

                        {/* DATE */}
                        <div className="text-sm text-gray-500">
                          Ordered on
                          <br />
                          <span className="font-medium text-gray-700">
                            {new Date(order.createdAt).toLocaleString()}
                          </span>
                        </div>

                        {/* ==========================
                            DELIVERED ACTION
                        ========================== */}
                        {order.status === "delivered" && (
                          <button className="mt-3 w-full rounded-xl bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600">
                            Order Again
                          </button>
                        )}

                        {/* ==========================
                            CANCEL ACTION
                        ========================== */}
                        {order.status === "pending" && (
                          <button
                            onClick={() => cancelOrder(order._id)}
                            className="mt-3 w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
                          >
                            Cancel Order
                          </button>
                        )}

                        {/* ==========================
                            CANCELLED ACTIONS
                        ========================== */}
                        {order.status === "cancelled" && (
                          <div className="mt-4 space-y-3">
                            <button className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600">
                              Order Again
                            </button>

                            <button
                              onClick={() => archiveOrder(order._id)}
                              className="w-full rounded-xl border border-red-500 py-3 font-semibold text-red-500 transition hover:bg-red-50"
                            >
                              Remove History
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    
  );
};

export default MyOrders;
