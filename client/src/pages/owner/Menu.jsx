import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus, UtensilsCrossed } from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { api } from "../../services/api";

const menu = [
  { name: "Dashboard", path: "/owner/dashboard" },
  { name: "Restaurant", path: "/owner/restaurant" },
  { name: "Menu", path: "/owner/menu" },
];

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await api.get("/menu/my");

      setFoods(res.data.menus);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/menu/${id}`);

      setFoods((prev) => prev.filter((food) => food._id !== id));
    } catch (error) {
      console.log(error);

      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Menu" menu={menu}>
        <div className="py-10 text-center">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Menu" menu={menu}>
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Menu Management</h1>

          <p className="mt-1 text-gray-500">
            Manage your restaurant food items
          </p>
        </div>

        <Link
          to="/owner/menu/create"
          className="
          flex items-center justify-center gap-2
          rounded-xl bg-orange-500
          px-5 py-3
          text-white
          hover:bg-orange-600
          "
        >
          <Plus size={18} />
          Add Food
        </Link>
      </div>

      {foods.length === 0 ? (
        <div
          className="
          rounded-xl bg-white
          p-10 text-center shadow
          "
        >
          <UtensilsCrossed size={60} className="mx-auto text-orange-500" />

          <h2 className="mt-4 text-xl font-bold">No Menu Items</h2>

          <p className="mt-2 text-gray-500">Add your first food item</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}

          <div
            className="
        hidden
        overflow-hidden
        rounded-xl
        bg-white
        shadow
        md:block
        "
          >
            <table className="w-full">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="p-4 text-left">Image</th>

                  <th className="p-4 text-left">Food</th>

                  <th className="p-4 text-left">Category</th>

                  <th className="p-4 text-left">Price</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {foods.map((food) => (
                  <tr key={food._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <img
                        src={food.image || "https://placehold.co/80"}
                        className="
                  h-16 w-16
                  rounded-lg
                  object-cover
                  "
                      />
                    </td>

                    <td className="p-4">
                      <p className="font-semibold">{food.name}</p>

                      <p className="text-sm text-gray-500">
                        {food.description}
                      </p>
                    </td>

                    <td className="p-4">{food.category}</td>

                    <td className="p-4 font-semibold">Rs. {food.price}</td>

                    <td className="p-4">
                      <span
                        className={`
                rounded-full px-3 py-1 text-sm
                ${
                  food.isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
                `}
                      >
                        {food.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/owner/menu/edit/${food._id}`}
                          className="
                  rounded-lg
                  bg-white
                  border border-orange-500
                  p-2
                  text-orange-500
                  hover:bg-orange-500
                  hover:text-white
                  "
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() => handleDelete(food._id)}
                          className="
                  rounded-lg
                  bg-white
                  border border-red-500
                  p-2
                  text-red-500
                  hover:bg-red-500
                  hover:text-white
                  "
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}

          <div className="grid gap-5 md:hidden">
            {foods.map((food) => (
              <div
                key={food._id}
                className="
          rounded-xl
          bg-white
          p-4
          shadow
          "
              >
                <img
                  src={food.image || "https://placehold.co/300"}
                  className="
            h-48
            w-full
            rounded-xl
            object-cover
            "
                />

                <h2 className="mt-4 text-xl font-bold">{food.name}</h2>

                <p className="mt-1 text-gray-500">{food.description}</p>

                <div className="mt-3 flex justify-between">
                  <span>{food.category}</span>

                  <span className="font-bold text-orange-500">
                    Rs. {food.price}
                  </span>
                </div>

                <div className="mt-3">
                  <span
                    className={`
            rounded-full px-3 py-1 text-sm
            ${
              food.isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
            `}
                  >
                    {food.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="mt-4 flex gap-3">
                  <Link
                    to={`/owner/menu/edit/${food._id}`}
                    className="
              flex flex-1
              items-center justify-center gap-2
              rounded-lg
              bg-orange-500
              py-3
              text-white
              "
                  >
                    <Pencil size={18} />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(food._id)}
                    className="
              flex flex-1
              items-center justify-center gap-2
              rounded-lg
              bg-red-500
              py-3
              text-white
              "
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Menu;
