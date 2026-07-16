import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Clock3,
  UtensilsCrossed,
  Pencil,
  Trash2,
} from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { api } from "../../services/api";

const menu = [
  { name: "Dashboard", path: "/owner/dashboard" },
  { name: "Restaurant", path: "/owner/restaurant" },
  { name: "Menu", path: "/owner/menu" },
];

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const res = await api.get("/restaurants/my");

      setRestaurant(res.data.restaurant);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this restaurant?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/restaurants/${restaurant._id}`);

      alert("Restaurant deleted successfully");

      window.location.href = "/owner/restaurant";
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Restaurant" menu={menu}>
        <div className="py-10 text-center">Loading...</div>
      </DashboardLayout>
    );
  }

  if (!restaurant) {
    return (
      <DashboardLayout title="Restaurant" menu={menu}>
        <div
          className="
        rounded-xl bg-white
        p-10 text-center shadow
        "
        >
          <h2 className="text-2xl font-bold">No Restaurant Found</h2>

          <p className="mt-3 text-gray-500">Create your restaurant first.</p>

          <Link
            to="/owner/create-restaurant"
            className="
          mt-6 inline-block
          rounded-lg
          bg-orange-500
          px-6 py-3
          text-white
          hover:bg-orange-600
          "
          >
            Create Restaurant
          </Link>
        </div>
      </DashboardLayout>
    );
  }
 
  return (
    <DashboardLayout title="Restaurant" menu={menu}>
      <div
        className="
      overflow-hidden
      rounded-xl
      bg-white
      shadow
      "
      >
        {/* Cover Image */}

        <img
          src={restaurant.coverImage || "https://placehold.co/1200x300"}
          alt="cover"
          className="
        h-48
        w-full
        object-cover
        sm:h-72
        "
        />

        <div
          className="
        relative
        p-4
        sm:p-8
        "
        >
          {/* Profile Image */}

          <img
            src={restaurant.profileImage || "https://placehold.co/150"}
            alt="profile"
            className="
          absolute
          left-1/2
          -top-16
          h-32
          w-32
          -translate-x-1/2
          rounded-full
          border-4
          border-white
          object-cover
          shadow-lg

          sm:left-8
          sm:translate-x-0
          "
          />

          {/* Header */}

          <div
            className="
          mt-20
          flex
          flex-col
          gap-6

          sm:ml-40
          sm:mt-0
          sm:flex-row
          sm:items-center
          sm:justify-between
          "
          >
            <div>
              <h1
                className="
              text-2xl
              font-bold
              sm:text-3xl
              "
              >
                {restaurant.name}
              </h1>

              <p
                className="
              mt-2
              text-gray-600
              "
              >
                {restaurant.description}
              </p>
            </div>

            {/* Actions */}

            <div
              className="
            flex
            flex-col
            gap-3

            sm:flex-row
            "
            >
              <Link
                to={`/owner/restaurant/edit/${restaurant._id}`}
                className="
              flex
              items-center
              justify-center
              gap-2

              rounded-lg
              bg-orange-500
              px-5
              py-3
              text-white

              hover:bg-orange-600
              "
              >
                <Pencil size={18} />
                Edit
              </Link>

              <button
                onClick={handleDelete}
                className="
              flex
              items-center
              justify-center
              gap-2

              rounded-lg

              bg-white

              border
              border-red-500

              px-5
              py-3

              text-red-500

              hover:bg-red-500
              hover:text-white
              "
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>

          {/* Restaurant Info */}

          <div
            className="
          mt-10
          grid
          gap-5

          sm:grid-cols-2
          "
          >
            <div className="flex items-center gap-3">
              <MapPin className="text-orange-500" />

              <span>{restaurant.address}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-orange-500" />

              <span>{restaurant.phone}</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock3 className="text-orange-500" />

              <span>{restaurant.deliveryTime}</span>
            </div>

            <div className="flex items-center gap-3">
              <UtensilsCrossed className="text-orange-500" />

              <span>{restaurant.cuisine?.join(", ")}</span>
            </div>
          </div>

          {/* Status */}

          <div className="mt-8">
            <span
              className={`
            rounded-full
            px-4
            py-2
            text-sm
            font-semibold

            ${
              restaurant.isOpen
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }

            `}
            >
              {restaurant.isOpen ? "Open" : "Closed"}
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Restaurant;
