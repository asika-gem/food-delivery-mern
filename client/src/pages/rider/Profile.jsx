import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin } from "lucide-react";

import { api } from "../../services/api";

const RiderProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleAvailability = async () => {
    try {
      const res = await api.put("/rider/availability");

      setUser((prev) => ({
        ...prev,
        available: res.data.available,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return (
      <div className="py-24 text-center text-xl font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
        {/* Profile Header */}
        <div className="bg-orange-500 py-10 text-center text-white">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white">
            <User size={60} className="text-orange-500" />
          </div>

          <h1 className="mt-4 text-3xl font-bold">{user.name}</h1>

          <p className="mt-1">Delivery Rider</p>
        </div>

        {/* Profile Information */}
        <div className="space-y-6 p-8">
          {/* Email */}
          <div className="flex items-center gap-4">
            <Mail className="text-orange-500" />

            <div>
              <p className="text-sm text-gray-500">Email</p>

              <span className="font-medium">{user.email}</span>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4">
            <Phone className="text-orange-500" />

            <div>
              <p className="text-sm text-gray-500">Phone</p>

              <span className="font-medium">
                {user.phone || "No phone added"}
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-4">
            <MapPin className="text-orange-500" />

            <div>
              <p className="text-sm text-gray-500">Address</p>

              <span className="font-medium">
                {user.address || "No address added"}
              </span>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between rounded-2xl bg-gray-100 p-5">
            <div>
              <h3 className="font-semibold">Rider Availability</h3>

              <p className="text-sm text-gray-500">
                {user.available
                  ? "You are available for delivery."
                  : "You are currently offline."}
              </p>
            </div>

            <button
              onClick={toggleAvailability}
              className={`rounded-full px-6 py-2 font-semibold text-white transition ${
                user.available
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {user.available ? "Online" : "Offline"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderProfile;
