import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { api } from "../../services/api";

const menu = [
  { name: "Dashboard", path: "/owner/dashboard" },
  { name: "Restaurant", path: "/owner/restaurant" },
  { name: "Menu", path: "/owner/menu" },
];

const EditRestaurant = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [restaurantId, setRestaurantId] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    cuisine: "",
    deliveryTime: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const { data } = await api.get("/restaurants/my");

      const restaurant = data.restaurant;

      setRestaurantId(restaurant._id);

      setForm({
        name: restaurant.name || "",
        description: restaurant.description || "",
        address: restaurant.address || "",
        phone: restaurant.phone || "",
        cuisine: restaurant.cuisine?.join(",") || "",
        deliveryTime: restaurant.deliveryTime || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      await api.put(`/restaurants/${restaurantId}`, formData);

      alert("Restaurant updated successfully");

      navigate("/owner/restaurant");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Edit Restaurant" menu={menu}>
      <div className="rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-8 text-3xl font-bold">Edit Restaurant</h1>

        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Restaurant Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Phone</label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">Description</label>

            <textarea
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Address</label>

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Delivery Time</label>

            <input
              type="text"
              name="deliveryTime"
              value={form.deliveryTime}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">Cuisine</label>

            <input
              type="text"
              name="cuisine"
              value={form.cuisine}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">New Profile Image</label>

            <input
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">New Cover Image</label>

            <input
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600"
            >
              {loading ? "Updating..." : "Update Restaurant"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditRestaurant;
