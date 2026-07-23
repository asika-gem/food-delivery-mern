import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";

const MenuCard = ({ menu, isFavorite = false, onFavoriteChange }) => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  const [liked, setLiked] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  // Keep heart state updated if parent changes
  useEffect(() => {
    setLiked(isFavorite);
  }, [isFavorite]);

  const handleFavorite = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await api.put(`/auth/favorite/${menu._id}`);

      const newLikedState = res.data.isFavorite ?? !liked;

      setLiked(newLikedState);

      // Tell Favorites page about the change
      if (onFavoriteChange) {
        onFavoriteChange(newLikedState);
      }
    } catch (error) {
      console.log("Favorite error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-3xl bg-white shadow-lg"
    >
      {/* ==============================
          IMAGE
      ============================== */}
      <div className="relative">
        <img
          src={menu.image}
          alt={menu.name}
          className="h-56 w-full object-cover"
        />

        {/* FAVORITE BUTTON */}
        {currentUser?.role === "customer" && (
          <button
            type="button"
            onClick={handleFavorite}
            disabled={loading}
            className="absolute right-4 top-4 rounded-full bg-white p-3 shadow-md transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Heart
              size={22}
              className={liked ? "fill-red-500 text-red-500" : "text-gray-500"}
            />
          </button>
        )}
      </div>

      {/* ==============================
          CONTENT
      ============================== */}
      <div className="p-5">
        {/* NAME + RATING */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-gray-800">{menu.name}</h3>

          <span className="flex shrink-0 items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            4.8
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-3 line-clamp-2 text-gray-500">{menu.description}</p>

        {/* PRICE + CART */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-500">
            Rs. {menu.price}
          </span>

          {currentUser?.role === "customer" && (
            <button
              type="button"
              onClick={() => addToCart(menu)}
              className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
            >
              <ShoppingCart size={16} />
              Add
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
