import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";
import { api } from "../../services/api";



const OwnerProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setProfile(res.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
     
        <div className="py-20 text-center text-xl font-semibold">
          Loading Profile...
        </div>
      
    );
  }

  return (
    
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="mb-10 flex flex-col items-center">
            <div className="relative">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="h-36 w-36 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-orange-100">
                  <User size={60} className="text-orange-500" />
                </div>
              )}

              <button className="absolute bottom-0 right-0 rounded-full bg-orange-500 p-3 text-white shadow hover:bg-orange-600">
                <Camera size={18} />
              </button>
            </div>

            <h1 className="mt-5 text-3xl font-bold">{profile.name}</h1>

            <p className="mt-1 text-gray-500">Restaurant Owner</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-orange-50 p-5">
              <div className="mb-2 flex items-center gap-2 text-orange-600">
                <User size={18} />
                <span className="font-semibold">Full Name</span>
              </div>

              <p className="text-lg">{profile.name}</p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5">
              <div className="mb-2 flex items-center gap-2 text-orange-600">
                <Mail size={18} />
                <span className="font-semibold">Email</span>
              </div>

              <p className="text-lg">{profile.email}</p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5">
              <div className="mb-2 flex items-center gap-2 text-orange-600">
                <Phone size={18} />
                <span className="font-semibold">Phone</span>
              </div>

              <p className="text-lg">{profile.phone || "Not Added"}</p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5">
              <div className="mb-2 flex items-center gap-2 text-orange-600">
                <MapPin size={18} />
                <span className="font-semibold">Address</span>
              </div>

              <p className="text-lg">{profile.address || "Not Added"}</p>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <button
              onClick={() =>
                (window.location.href = "/owner/restaurant/edit/:id")
              }
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default OwnerProfile;
