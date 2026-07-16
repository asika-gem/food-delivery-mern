import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { api } from "../../services/api";
import {
  User,
  Phone,
  MapPin,
  Store,
  CheckCircle,
  XCircle,
  Truck,
} from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/rider/dashboard" },
  { name: "Deliveries", path: "/rider/orders" },
  { name: "Profile", path: "/rider/profile" },
];

const RiderOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/rider");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptOrder = async (id) => {
    try {
      await api.put(`/orders/${id}/accept`);
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectOrder = async (id) => {
    try {
      await api.put(`/orders/${id}/reject`);
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const markDelivered = async (id) => {
    try {
      await api.put(`/orders/${id}/delivered`);
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout title="Deliveries" menu={menu}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Assigned Deliveries</h1>
          <p className="text-gray-500">Accept new requests and deliver food.</p>
        </div>

        <div className="bg-orange-500 text-white rounded-xl px-5 py-3 shadow">
          <h2 className="text-2xl font-bold">{orders.length}</h2>
          <p>Total Orders</p>
        </div>
      </div>

      {orders.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow">
          <Truck size={70} className="mx-auto text-orange-500" />

          <h2 className="mt-5 text-2xl font-bold">No Delivery Assigned</h2>

          <p className="mt-2 text-gray-500">
            Waiting for restaurant owner to assign a delivery.
          </p>
        </div>
      )}

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="overflow-hidden rounded-3xl bg-white shadow-lg"
          >
            {/* Header */}

            <div className="flex justify-between items-center bg-orange-50 border-b px-8 py-5">
              <div>
                <h2 className="text-2xl font-bold">{order.restaurant?.name}</h2>

                <p className="text-gray-500">Order ID : {order._id}</p>
              </div>

              <span className="rounded-full bg-orange-500 px-5 py-2 font-semibold text-white">
                {order.status}
              </span>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 p-8">
              {/* Customer */}

              <div className="space-y-5">
                <h3 className="text-xl font-bold">Customer</h3>

                <div className="flex items-center gap-3">
                  <User className="text-orange-500" />
                  {order.customer?.name}
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-orange-500" />
                  {order.phone}
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-orange-500" />
                  {order.address}
                </div>
              </div>

              {/* Restaurant */}

              <div className="space-y-5">
                <h3 className="text-xl font-bold">Pickup Restaurant</h3>

                <div className="flex items-center gap-3">
                  <Store className="text-orange-500" />
                  {order.restaurant?.name}
                </div>

                <div className="font-bold text-3xl text-orange-500">
                  Rs. {order.totalAmount}
                </div>

                <div className="text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Items */}

              <div>
                <h3 className="mb-5 text-xl font-bold">Ordered Items</h3>

                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between rounded-xl border p-3"
                    >
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>

                        <p className="text-sm text-gray-500">
                          Qty : {item.quantity}
                        </p>
                      </div>

                      <div className="font-bold text-orange-500">
                        Rs. {item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}

            <div className="border-t bg-gray-50 p-6 flex gap-4">
              {order.status === "waiting for pickup" && (
                <>
                  <div className="flex gap-4">
                    <button
                      onClick={() => acceptOrder(order._id)}
                      className="flex-1 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
                    >
                      Accept Delivery
                    </button>

                    <button
                      onClick={() => rejectOrder(order._id)}
                      className="flex-1 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                      Decline
                    </button>
                  </div>
                </>
              )}

              {order.status === "picked" && (
                <button
                  onClick={() => markDelivered(order._id)}
                  className="w-full rounded-xl bg-blue-500 py-3 text-white font-semibold hover:bg-blue-600"
                >
                  Mark as Delivered
                </button>
              )}

              {order.status === "delivered" && (
                <button
                  disabled
                  className="w-full rounded-xl bg-green-500 py-3 text-white font-semibold"
                >
                  Delivery Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default RiderOrders;
