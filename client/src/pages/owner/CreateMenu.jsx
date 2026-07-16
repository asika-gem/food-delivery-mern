import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowLeft } from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { api } from "../../services/api";

const menu = [
  { name: "Dashboard", path: "/owner/dashboard" },
  { name: "Restaurant", path: "/owner/restaurant" },
  { name: "Menu", path: "/owner/menu" },
];

const CreateMenu = () => {
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: null,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  // Get owner's restaurant
  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const res = await api.get("/restaurants/my");

      setRestaurant(res.data.restaurant);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!restaurant) {
      alert("Create restaurant first");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("restaurant", restaurant._id);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);

      if (image) {
        data.append("image", image);
      }

      await api.post("/menu", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Food added successfully");

      navigate("/owner/menu");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to create menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Create Menu" menu={menu}>
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
        <button
          onClick={() => navigate("/owner/menu")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-orange-500"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="mb-6 text-3xl font-bold">Add New Food</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image */}

          <div>
            <label className="mb-2 block font-semibold">Food Image</label>

            <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:border-orange-500">
              {preview ? (
                <img
                  src={preview}
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : (
                <>
                  <Upload className="mb-2 text-gray-400" size={35} />

                  <span className="text-gray-500">Upload Image</span>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImage}
              />
            </label>
          </div>

          {/* Name */}

          <div>
            <label className="mb-2 block font-semibold">Food Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Burger"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block font-semibold">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Food description..."
              rows="4"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          {/* Category */}

          <div>
            <label className="mb-2 block font-semibold">Category</label>

            <input
              type="text"
              name="category"
              placeholder="Enter category (e.g. Pizza, Momo, Drinks)"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Price */}

          <div>
            <label className="mb-2 block font-semibold">Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="250"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Food"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateMenu;
