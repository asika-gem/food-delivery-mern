import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { api } from "../../services/api";

const menu = [
  { name: "Dashboard", path: "/owner/dashboard" },
  { name: "Restaurant", path: "/owner/restaurant" },
  { name: "Menu", path: "/owner/menu" },
];

const EditMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    isAvailable: true,
  });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await api.get(`/menu/${id}`);

      const food = res.data.menu;

      setFormData({
        name: food.name,
        description: food.description,
        category: food.category,
        price: food.price,
        isAvailable: food.isAvailable,
      });

      setPreview(food.image);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
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

    try {
      setSaving(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);

      data.append("category", formData.category);

      data.append("price", formData.price);

      data.append("isAvailable", formData.isAvailable);

      if (image) {
        data.append("image", image);
      }

      await api.put(`/menu/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Menu updated successfully");

      navigate("/owner/menu");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Edit Menu" menu={menu}>
        <div className="py-10 text-center">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Menu" menu={menu}>
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
        <button
          onClick={() => navigate("/owner/menu")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-orange-500"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="mb-6 text-3xl font-bold">Edit Food</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image */}

          <div>
            <label className="mb-2 block font-semibold">Food Image</label>

            <label className="flex h-48 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 hover:border-orange-500">
              {preview ? (
                <img src={preview} className="h-full w-full object-cover" />
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto text-gray-400" />

                  <p className="text-gray-500">Upload Image</p>
                </div>
              )}

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />
            </label>
          </div>

          <div>
            <label className="mb-2 block font-semibold">Food Name</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3"
            >
              <option value="Burger">Burger</option>

              <option value="Pizza">Pizza</option>

              <option value="Momo">Momo</option>

              <option value="Drinks">Drinks</option>

              <option value="Dessert">Dessert</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold">Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Availability</label>

            <select
              name="isAvailable"
              value={formData.isAvailable}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-3"
            >
              <option value={true}>Available</option>

              <option value={false}>Unavailable</option>
            </select>
          </div>

          <button
            disabled={saving}
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Food"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditMenu;
