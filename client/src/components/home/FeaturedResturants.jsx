import { useEffect, useState } from "react";
import { api } from "../../services/api";
import RestaurantCard from "./RestaurantCard";

const FeaturedRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await api.get("/restaurants");
      setRestaurants(res.data.restaurants || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const keyword = search.toLowerCase();

    return (
      restaurant.name?.toLowerCase().includes(keyword) ||
      restaurant.description?.toLowerCase().includes(keyword) ||
      restaurant.address?.toLowerCase().includes(keyword)
    );
  });

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-4xl font-extrabold">Featured Restaurants</h2>

        {filteredRestaurants.length === 0 ? (
          <p className="text-center text-gray-500">No restaurants found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
