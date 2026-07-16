import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Bike } from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { api } from "../../services/api";

const menu = [
  { name: "Dashboard", path: "/rider/dashboard" },
  { name: "Deliveries", path: "/rider/orders" },
  { name: "Profile", path: "/rider/profile" },
];

const RiderProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);
const toggleAvailability = async () => {
  try {
    const res = await api.put("/rider/availability");

    setUser({
      ...user,
      available: res.data.available,
    });
  } catch (err) {
    console.log(err);
  }
};
  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return (
      <DashboardLayout title="Profile" menu={menu}>
        <div className="py-24 text-center text-xl font-semibold">
          Loading Profile...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Profile" menu={menu}>
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-white shadow-lg overflow-hidden">
          <div className="bg-orange-500 py-10 text-center text-white">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white">
              <User size={60} className="text-orange-500" />
            </div>

            <h1 className="mt-4 text-3xl font-bold">{user.name}</h1>

            <p className="mt-1">Delivery Rider</p>
          </div>

          <div className="space-y-6 p-8">
            <div className="flex items-center gap-4">
              <Mail className="text-orange-500" />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-orange-500" />
              <span>{user.phone || "No phone added"}</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-orange-500" />
              <span>{user.address || "No address added"}</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-100 p-4">
              <div>
                <h3 className="font-semibold">Availability</h3>

                <p className="text-sm text-gray-500">
                  {user.available
                    ? "You are available for delivery."
                    : "You are offline."}
                </p>
              </div>

              <button
                onClick={toggleAvailability}
                className={`rounded-full px-6 py-2 font-semibold text-white ${
                  user.available
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {user.available ? "Online" : "Offline"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RiderProfile;
