import { useEffect, useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Receipt,
  Clock,
  CheckCircle,
  Package,
  Truck,
  XCircle,
} from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { api } from "../../services/api";

const menu = [
  { name: "Dashboard", path: "/owner/dashboard" },
  { name: "Restaurant", path: "/owner/restaurant" },
  { name: "Menu", path: "/owner/menu" },
  { name: "Orders", path: "/owner/orders" },
];

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

const OwnerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [riders, setRiders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedRider, setSelectedRider] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

 

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders/owner");
      console.log("Orders:", res.data);
      setOrders(res.data.orders || []);
    } catch (err) {
     console.error("fetchOrders Error:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  
const fetchRiders = async () => {
  try {
    const res = await api.get("/rider/available");
    console.log("Riders:", res.data);

    setRiders(res.data.riders || []);
  } catch (err) {
   
    console.error("fetchRiders Error:", err.response?.data || err);
  }
};
const updateStatus = async (id, status) => {
  try {
    await api.put(`/orders/${id}/status`, {
      status,
    });

    fetchOrders();
  } catch (err) {
    console.log(err);
  }
};
const openAssignModal = (order) => {
  setSelectedOrder(order);
  setShowModal(true);
};

const assignRider = async () => {
  if (!selectedRider) {
    return alert("Select a rider.");
  }

  try {
    await api.put(`/orders/${selectedOrder._id}/assign-rider`, {
      riderId: selectedRider,
    });

    setShowModal(false);
    setSelectedOrder(null);
    setSelectedRider("");

    await fetchOrders();
    await fetchRiders();
  } catch (err) {
    console.error(err.response?.data || err);
  }
};
 useEffect(() => {
   fetchOrders();
   fetchRiders();
 }, []);
 if (loading) {
   return (
     <DashboardLayout title="Orders" menu={menu}>
       <div className="py-24 text-center text-xl font-semibold">
         Loading Orders...
       </div>
     </DashboardLayout>
   );
 }

 if (orders.length === 0) {
   return (
     <DashboardLayout title="Orders" menu={menu}>
       <div className="flex h-[70vh] items-center justify-center">
         <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
           <Receipt size={70} className="mx-auto text-orange-500" />

           <h2 className="mt-5 text-3xl font-bold">No Orders Yet</h2>

           <p className="mt-2 text-gray-500">
             Customer orders will appear here.
           </p>
         </div>
       </div>
     </DashboardLayout>
   );
 }
  return (
    <DashboardLayout title="Orders" menu={menu}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Incoming Orders</h1>

            <p className="mt-2 text-gray-500">
              Manage customer orders efficiently.
            </p>
          </div>

          <div className="rounded-xl bg-orange-500 px-5 py-3 text-white shadow-lg">
            <h2 className="text-2xl font-bold">{orders.length}</h2>

            <p>Total Orders</p>
          </div>
        </div>

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between border-b bg-orange-50 px-8 py-5">
                <div>
                  <h2 className="text-xl font-bold">{order.customer?.name}</h2>

                  <p className="text-sm text-gray-500">
                    Order ID : {order._id}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold ${statusColor[order.status]}`}
                >
                  {statusIcon[order.status]}
                  {order.status}
                </div>
              </div>

              <div className="grid gap-8 p-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <h3 className="mb-5 text-xl font-bold">Ordered Items</h3>

                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-2xl border p-4"
                      >
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>

                          <p className="text-sm text-gray-500">
                            Quantity : {item.quantity}
                          </p>
                        </div>

                        <div className="font-bold text-orange-500">
                          Rs. {item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-gray-50 p-6">
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <User className="text-orange-500" />
                      <span>{order.customer?.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="text-orange-500" />
                      <span>{order.phone}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="text-orange-500" />
                      <span>{order.address}</span>
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

                    {/* Action Buttons */}

                    <div className="space-y-3">
                      {order.status === "pending" && (
                        <button
                          onClick={() => updateStatus(order._id, "confirmed")}
                          className="w-full rounded-xl bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600"
                        >
                          Confirm Order
                        </button>
                      )}

                      {order.status === "confirmed" && (
                        <button
                          onClick={() => updateStatus(order._id, "preparing")}
                          className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
                        >
                          Start Preparing
                        </button>
                      )}

                      {order.status === "preparing" && (
                        <button
                          onClick={() => updateStatus(order._id, "ready")}
                          className="w-full rounded-xl bg-purple-500 py-3 font-semibold text-white transition hover:bg-purple-600"
                        >
                          Mark Ready
                        </button>
                      )}

                      {order.status === "ready" && (
                        <button
                          onClick={() => openAssignModal(order)}
                          className="w-full rounded-xl bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600"
                        >
                          Assign Rider
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <h2 className="mb-5 text-2xl font-bold">Assign Rider</h2>

            <select
              value={selectedRider}
              onChange={(e) => setSelectedRider(e.target.value)}
              className="mb-5 w-full rounded-xl border p-3"
            >
              <option value="">Select Rider</option>

              {riders.map((rider) => (
                <option key={rider._id} value={rider._id}>
                  {rider.name}
                </option>
              ))}
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-xl border py-3"
              >
                Cancel
              </button>

              <button
                onClick={assignRider}
                className="flex-1 rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default OwnerOrders;
