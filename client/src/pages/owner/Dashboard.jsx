import { useEffect, useState } from "react";
import { Store, UtensilsCrossed, ShoppingBag, DollarSign } from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { api } from "../../services/api";


const menu = [
  { name: "Dashboard", path: "/owner/dashboard" },
  { name: "Restaurant", path: "/owner/restaurant" },
  { name: "Menu", path: "/owner/menu" },
  { name: "Orders", path: "/owner/orders" },
  {name: "Profile", path: "/owner/profile" }
];


const Dashboard = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);

  const [stats, setStats] = useState({
    restaurants: 0,
    foods: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const restaurantRes = await api.get("/restaurants/my");
      const menuRes = await api.get("/menu/my");
      const orderRes = await api.get("/orders/owner");


      const restaurant = restaurantRes.data.restaurant;
      const menus = menuRes.data.menus || [];
      const orders = orderRes.data.orders || [];

      setRestaurant(restaurant);
      setMenus(menus);
      setOrders(orders);

      const revenue = orders
        .filter((o) => o.status === "delivered")
        .reduce((sum, o) => sum + o.totalAmount, 0);

      const activeOrders = orders.filter((o) =>
        ["pending", "confirmed", "preparing"].includes(o.status),
      ).length;

      setStats({
        restaurants: restaurant ? 1 : 0,
        foods: menus.length,
        orders: activeOrders,
        revenue,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout title="Restaurant Owner" menu={menu}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Owner Dashboard 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your restaurant, menu and customer orders.
        </p>
      </div>

      {/* Stats Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
            <Store className="text-orange-600" size={25} />
          </div>

          <h2 className="text-4xl font-bold text-slate-900">
            {stats.restaurants}
          </h2>

          <p className="mt-2 text-slate-500">Restaurant</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
            <UtensilsCrossed className="text-orange-600" size={25} />
          </div>

          <h2 className="text-4xl font-bold text-slate-900">{stats.foods}</h2>

          <p className="mt-2 text-slate-500">Menu Items</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
            <ShoppingBag className="text-orange-600" size={25} />
          </div>

          <h2 className="text-4xl font-bold text-slate-900">{stats.orders}</h2>

          <p className="mt-2 text-slate-500">Active Orders</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
            <DollarSign className="text-orange-600" size={25} />
          </div>

          <h2 className="text-4xl font-bold text-slate-900">
            Rs. {stats.revenue}
          </h2>

          <p className="mt-2 text-slate-500">Revenue</p>
        </div>
      </div>
      {/* Today's Orders */}

      <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Today's Orders
            </h2>

            <p className="text-sm text-slate-500">
              Manage your latest customer orders
            </p>
          </div>

          <button
            onClick={() => (window.location.href = "/owner/orders")}
            className="rounded-xl bg-orange-100 px-5 py-2 font-semibold text-orange-600 transition hover:bg-orange-200"
          >
            View All
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="py-12 text-center">
            <ShoppingBag size={55} className="mx-auto mb-4 text-slate-300" />

            <h3 className="text-xl font-bold text-slate-900">No Orders Yet</h3>

            <p className="mt-2 text-slate-500">
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="rounded-3xl bg-slate-50 p-6 transition hover:shadow-md"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                  {/* Customer Details */}

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {order.customer?.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {order.customer?.phone}
                        </p>

                        <p className="text-sm text-slate-500">
                          {order.address}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between rounded-xl bg-white px-4 py-3"
                        >
                          <span className="text-slate-700">
                            {item.name} × {item.quantity}
                          </span>

                          <span className="font-semibold text-orange-600">
                            Rs. {item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Action */}

                  <div className="w-full lg:w-72">
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">Total Amount</p>

                      <h2 className="mt-2 text-3xl font-bold text-orange-600">
                        Rs. {order.totalAmount}
                      </h2>

                      <div className="mt-5">
                        <span
                          className={`rounded-full px-4 py-2 text-sm font-semibold ${
                            order.status === "pending"
                              ? "bg-orange-100 text-orange-700"
                              : order.status === "confirmed"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "preparing"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : order.status === "ready"
                                    ? "bg-purple-100 text-purple-700"
                                    : order.status === "picked"
                                      ? "bg-slate-200 text-slate-700"
                                      : order.status === "delivered"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </div>

                      {order.status === "pending" && (
                        <button
                          onClick={() => updateStatus(order._id, "confirmed")}
                          className="mt-5 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
                        >
                          Confirm Order
                        </button>
                      )}

                      {order.status === "confirmed" && (
                        <button
                          onClick={() => updateStatus(order._id, "preparing")}
                          className="mt-5 w-full rounded-xl bg-slate-800 py-3 font-semibold text-white transition hover:bg-slate-900"
                        >
                          Start Preparing
                        </button>
                      )}

                      {order.status === "preparing" && (
                        <button
                          onClick={() => updateStatus(order._id, "ready")}
                          className="mt-5 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                        >
                          Mark Ready
                        </button>
                      )}

                      {order.status === "ready" && (
                        <button
                          onClick={() =>
                            (window.location.href = "/owner/orders")
                          }
                          className="mt-5 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
                        >
                          Assign Rider
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Bottom Section */}

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Restaurant Information */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Restaurant Information
            </h2>

            <button
              onClick={() => (window.location.href = "/owner/restaurant")}
              className="rounded-xl bg-orange-100 px-4 py-2 font-semibold text-orange-600 transition hover:bg-orange-200"
            >
              Edit
            </button>
          </div>

          {restaurant ? (
            <div className="space-y-5">
              <div>
                <p className="text-sm text-slate-500">Restaurant Name</p>

                <h3 className="text-xl font-bold text-slate-900">
                  {restaurant.name}
                </h3>
              </div>

              <div>
                <p className="text-sm text-slate-500">Phone</p>

                <h3 className="font-semibold">{restaurant.phone}</h3>
              </div>

              <div>
                <p className="text-sm text-slate-500">Address</p>

                <h3 className="font-semibold">{restaurant.address}</h3>
              </div>

              <div>
                <p className="text-sm text-slate-500">Status</p>

                <span
                  className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                    restaurant.isOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {restaurant.isOpen ? "Open" : "Closed"}
                </span>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center text-slate-500">
              No Restaurant Found
            </div>
          )}
        </div>

        {/* Recent Menu */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Recent Menu</h2>

            <button
              onClick={() => (window.location.href = "/owner/menu")}
              className="rounded-xl bg-orange-100 px-4 py-2 font-semibold text-orange-600 transition hover:bg-orange-200"
            >
              View All
            </button>
          </div>

          {menus.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              No Menu Items
            </div>
          ) : (
            <div className="space-y-4">
              {menus.slice(0, 5).map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 transition hover:bg-orange-50"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">{item.name}</h3>

                    <p className="text-sm text-slate-500">{item.category}</p>
                  </div>

                  <span className="font-bold text-orange-600">
                    Rs. {item.price}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Analytics */}

      <div className="mt-10 grid gap-6 xl:grid-cols-3">
        {/* Revenue */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Revenue</p>

              <h2 className="mt-3 text-4xl font-bold text-slate-900">
                Rs. {stats.revenue}
              </h2>

              <p className="mt-2 text-sm text-slate-500">Delivered orders</p>
            </div>

            <div className="rounded-2xl bg-orange-100 p-4 text-orange-600">
              💰
            </div>
          </div>
        </div>

        {/* Orders */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Orders</p>

            <div className="rounded-2xl bg-orange-100 p-4 text-orange-600">
              📦
            </div>
          </div>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {orders.length}
          </h2>

          <div className="mt-5 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Pending</span>

              <span className="font-semibold">
                {orders.filter((o) => o.status === "pending").length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Preparing</span>

              <span className="font-semibold">
                {orders.filter((o) => o.status === "preparing").length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Delivered</span>

              <span className="font-semibold text-green-600">
                {orders.filter((o) => o.status === "delivered").length}
              </span>
            </div>
          </div>
        </div>

        {/* Performance */}

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Restaurant Performance</p>

            <div className="rounded-2xl bg-orange-100 p-4 text-orange-600">
              🏪
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-500">Menu Items</span>

              <span className="font-semibold">{menus.length}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Restaurant</span>

              <span className="font-semibold">
                {restaurant ? "Active" : "Not Created"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Status</span>

              <span
                className={
                  restaurant?.isOpen
                    ? "font-semibold text-green-600"
                    : "font-semibold text-slate-500"
                }
              >
                {restaurant?.isOpen ? "Open" : "Closed"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Active Orders</span>

              <span className="font-semibold">{stats.orders}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-10 rounded-3xl bg-orange-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          Grow Your Restaurant 🚀
        </h2>

        <p className="mt-3 text-slate-600">
          Manage orders, update your menu, and provide the best customer
          experience.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;