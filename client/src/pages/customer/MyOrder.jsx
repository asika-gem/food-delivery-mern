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

const cancelOrder = async (id) => {
  try {
    await api.put(`/orders/${id}/cancel`);

    fetchOrders();

    alert("Order cancelled successfully.");
  } catch (err) {
    console.log(err);
  }
};
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchOrders();
  }, []);
  const archiveOrder = async (id) => {
  const ok = window.confirm(
    "Remove this cancelled order from your history?"
  );

  if (!ok) return;

  try {
    await api.put(`/orders/${id}/archive`);

    fetchOrders();

    alert("Order removed from history.");
  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Something went wrong.");
  }
};
  

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my");
      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 text-center text-xl font-semibold">
        Loading Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
          <Receipt size={70} className="mx-auto text-orange-500" />
          <h2 className="mt-6 text-3xl font-bold">No Orders Yet</h2>
          <p className="mt-2 text-gray-500">
            Your placed orders will appear here.
          </p>
        </div>
      </div>
    );
  }
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  return (
    <section className="min-h-screen bg-gray-100 pt-28 pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="mb-8 text-4xl font-bold">My Orders</h1>
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
              className={`rounded-full px-5 py-2 font-medium transition ${
                filter === status
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 shadow hover:bg-orange-100"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg"
            >
              {/* Header */}

              <div className="flex flex-wrap items-center justify-between border-b bg-orange-50 px-8 py-5">
                <div>
                  <h2 className="text-xl font-bold">
                    {order.restaurant?.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Order ID: {order._id}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm ${statusColor[order.status]}`}
                >
                  {statusIcon[order.status]}
                  {order.status}
                </div>
              </div>

              {/* Body */}

              <div className="grid gap-8 p-8 lg:grid-cols-3">
                {/* Items */}

                <div className="lg:col-span-2">
                  <h3 className="mb-4 text-xl font-bold">Ordered Items</h3>

                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4 hover:bg-white hover:shadow transition"
                      >
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>

                          <p className="text-sm text-gray-500">
                            Qty : {item.quantity}
                          </p>
                        </div>

                        <h4 className="font-bold text-orange-500">
                          Rs. {item.price * item.quantity}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right */}

                <div className="rounded-2xl bg-gray-50 p-6">
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <Store className="text-orange-500" />
                      <span>{order.restaurant?.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="text-orange-500" />
                      <span>{order.address}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="text-orange-500" />
                      <span>{order.phone}</span>
                    </div>

                    <hr />

                    <div className="flex justify-between text-lg">
                      <span>Total Amount</span>

                      <span className="font-bold text-orange-500">
                        Rs. {order.totalAmount}
                      </span>
                    </div>

                    <div className="text-sm text-gray-500">
                      Ordered on
                      <br />
                      {new Date(order.createdAt).toLocaleString()}
                    </div>

                    {order.status === "delivered" && (
                      <button className="mt-3 w-full rounded-xl bg-green-500 py-3 font-semibold text-white hover:bg-green-600">
                        Order Again
                      </button>
                    )}

                    {order.status === "pending" && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="mt-3 w-full rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-600"
                      >
                        Cancel Order
                      </button>
                    )}
                    {order.status === "cancelled" && (
                      <div className="mt-4 space-y-3">
                        <button className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600">
                          Order Again
                        </button>

                        {order.status === "cancelled" && (
                          <button
                            onClick={() => archiveOrder(order._id)}
                            className="mt-3 w-full rounded-xl border border-red-500 py-3 font-semibold text-red-500 hover:bg-red-50"
                          >
                            Remove History
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyOrders;
