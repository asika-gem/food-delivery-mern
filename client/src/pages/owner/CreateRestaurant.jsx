import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { api } from "../../services/api";

const menu = [
  { name: "Dashboard", path: "/owner/dashboard" },
  { name: "Restaurant", path: "/owner/restaurant" },
  { name: "Menu", path: "/owner/menu" },
];

const CreateRestaurant = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("address", form.address);
      formData.append("phone", form.phone);
      formData.append("deliveryTime", form.deliveryTime);
      formData.append("cuisine", form.cuisine);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      await api.post("/restaurants", formData);

      alert("Restaurant created successfully!");

      navigate("/owner/restaurant");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Failed to create restaurant"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Create Restaurant" menu={menu}>
      <div className="rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-8 text-3xl font-bold">
          Create Restaurant
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-2"
        >
          <div>
            <label className="mb-2 block font-medium">
              Restaurant Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Address
            </label>

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Delivery Time
            </label>

            <input
              type="text"
              name="deliveryTime"
              placeholder="20-30 min"
              value={form.deliveryTime}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Cuisine
            </label>

            <input
              type="text"
              name="cuisine"
              placeholder="Pizza,Burger,Momo"
              value={form.cuisine}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Profile Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProfileImage(e.target.files[0])
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Cover Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setCoverImage(e.target.files[0])
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Restaurant"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateRestaurant;