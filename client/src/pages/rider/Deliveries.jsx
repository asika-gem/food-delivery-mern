
import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Package,
  Navigation,
  CheckCircle,
} from "lucide-react";

import { api } from "../../services/api";
import RiderLocationTracker from "../../components/tracking/RiderLocationTracker";

const Deliveries = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);

      const res = await api.get("/orders/rider");

      setOrders(res.data.orders || []);
    } catch (error) {
      console.error(
        "Failed to fetch deliveries:",
        error.response?.data || error,
      );
    } finally {
      setLoading(false);
    }
  };

  const markDelivered = async (orderId) => {
    const confirmDelivery = window.confirm(
      "Are you sure you want to mark this order as delivered?",
    );

    if (!confirmDelivery) return;

    try {
      await api.put(`/orders/${orderId}/delivered`);

      setActiveOrder(null);

      await fetchDeliveries();

      alert("Order marked as delivered successfully.");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to mark order as delivered.",
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />

          <p className="mt-4 font-semibold text-gray-500">
            Loading Deliveries...
          </p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-md rounded-3xl bg-white p-12 text-center shadow-xl">
          <Package
            size={70}
            className="mx-auto text-orange-500"
          />

          <h2 className="mt-6 text-3xl font-bold">
            No Deliveries
          </h2>

          <p className="mt-2 text-gray-500">
            You don't have any assigned deliveries yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            My Deliveries
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your assigned food deliveries.
          </p>
        </div>

        {/* ORDERS */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg"
            >

              {/* ORDER HEADER */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-orange-50 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold">
                    {order.restaurant?.name ||
                      "Restaurant"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Order ID: {order._id}
                  </p>
                </div>

                <span className="rounded-full bg-indigo-100 px-4 py-2 font-semibold text-indigo-700">
                  {order.status}
                </span>
              </div>

              {/* ORDER CONTENT */}
              <div className="grid gap-8 p-6 lg:grid-cols-3">

                {/* ITEMS */}
                <div className="lg:col-span-2">
                  <h3 className="mb-4 text-xl font-bold">
                    Ordered Items
                  </h3>

                  <div className="space-y-3">
                    {order.items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                      >
                        <div>
                          <p className="font-semibold">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="font-bold text-orange-500">
                          Rs.{" "}
                          {item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DELIVERY DETAILS */}
                <div className="rounded-2xl bg-gray-50 p-5">
                  <div className="space-y-5">

                    {/* CUSTOMER */}
                    <div className="flex gap-3">
                      <Package className="text-orange-500" />

                      <div>
                        <p className="text-xs text-gray-400">
                          Customer
                        </p>

                        <p className="font-semibold">
                          {order.customer?.name ||
                            "Customer"}
                        </p>
                      </div>
                    </div>

                    {/* PHONE */}
                    <div className="flex gap-3">
                      <Phone className="text-orange-500" />

                      <div>
                        <p className="text-xs text-gray-400">
                          Phone
                        </p>

                        <p className="font-semibold">
                          {order.phone ||
                            "Not available"}
                        </p>
                      </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="flex gap-3">
                      <MapPin className="text-orange-500" />

                      <div>
                        <p className="text-xs text-gray-400">
                          Delivery Address
                        </p>

                        <p className="font-semibold">
                          {order.address ||
                            "Not available"}
                        </p>
                      </div>
                    </div>

                    {/* TOTAL */}
                    <div className="flex justify-between border-t pt-4">
                      <span>Total</span>

                      <span className="font-bold text-orange-500">
                        Rs. {order.totalAmount}
                      </span>
                    </div>

                    {/* START DELIVERY */}
                    {order.status === "picked" &&
                      activeOrder !== order._id && (
                        <button
                          onClick={() =>
                            setActiveOrder(order._id)
                          }
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
                        >
                          <Navigation size={18} />
                          Start Live Tracking
                        </button>
                      )}

                    {/* STOP TRACKING */}
                    {activeOrder === order._id && (
                      <div className="space-y-3">
                        <div className="rounded-xl bg-green-50 p-3 text-center text-sm font-semibold text-green-700">
                          Live location is being shared
                        </div>

                        <button
                          onClick={() =>
                            setActiveOrder(null)
                          }
                          className="w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-600"
                        >
                          Stop Tracking
                        </button>

                        <button
                          onClick={() =>
                            markDelivered(order._id)
                          }
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-3 font-semibold text-white hover:bg-green-600"
                        >
                          <CheckCircle size={18} />
                          Mark Delivered
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* GPS TRACKER */}
              {activeOrder === order._id && (
                <div className="border-t bg-gray-50 p-6">
                  <RiderLocationTracker
                    orderId={order._id}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deliveries;

