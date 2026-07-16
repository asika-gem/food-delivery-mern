import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

import RestaurantBanner from "../components/restaurant/RestaurantBanner";
import MenuList from "../components/restaurant/MenuList";

const RestaurantDetails = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurant();
    fetchMenus();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      const res = await api.get(`/restaurants/${id}`);
      setRestaurant(res.data.restaurant || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMenus = async () => {
    try {
      const res = await api.get(`/menu/restaurant/${id}`);
      setMenus(res.data.menus || res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2 className="text-center py-20">Loading...</h2>;

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantBanner restaurant={restaurant} />

      <MenuList menus={menus} />
    </div>
  );
};

export default RestaurantDetails;
