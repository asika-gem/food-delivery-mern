import { useEffect, useState } from "react";
import { api } from "../../services/api";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

import { User, Phone, MapPin, Mail, Save } from "lucide-react";

const CustomerProfile = () => {
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");

      setUser(res.data.user);

      setForm({
        name: res.data.user.name || "",
        phone: res.data.user.phone || "",
        address: res.data.user.address || "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      await api.put("/auth/profile", form);

      alert("Profile updated");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    
      <div className="bg-slate-50 min-h-screen p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm p-8">
          <div className="flex items-center gap-5 mb-8">
            <div className="bg-slate-100 p-5 rounded-full">
              <User size={35} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>

              <p className="text-slate-500">Customer Account</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm text-slate-500">Name</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-2 rounded-xl bg-slate-100 px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-slate-500">Phone</label>

              <div className="flex items-center bg-slate-100 rounded-xl px-4">
                <Phone size={18} />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-500">Address</label>

              <div className="flex items-center bg-slate-100 rounded-xl px-4">
                <MapPin size={18} />

                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-3">
              <Mail size={18} />

              {user.email}
            </div>

            <button
              onClick={updateProfile}
              className="
bg-green-600
text-white
px-6
py-3
rounded-xl
flex
items-center
gap-2
font-semibold
"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default CustomerProfile;
