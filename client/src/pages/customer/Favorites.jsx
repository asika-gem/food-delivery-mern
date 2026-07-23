import { useEffect, useState } from "react";
import { Heart, Utensils, Sparkles, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";
import MenuCard from "../../components/restaurant/MenuCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ==============================
  // FETCH FAVORITES
  // ==============================
  const fetchFavorites = async () => {
    try {
      setLoading(true);

      const res = await api.get("/auth/favorites");

      setFavorites(res.data.favorites || []);
    } catch (error) {
      console.log("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <LoaderCircle
              size={40}
              className="mx-auto animate-spin text-orange-500"
            />

            <p className="mt-4 font-medium text-gray-500">
              Loading your favorites...
            </p>
          </div>
        </div>
    
    );
  }

  return (
    
      <div className="space-y-8">
        {/* =================================
            HEADER
        ================================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-400 p-8 text-white shadow-xl"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <Heart size={40} className="fill-white" />

              <div>
                <h1 className="text-3xl font-bold md:text-4xl">
                  My Favorite Foods
                </h1>

                <p className="mt-2 text-orange-50">
                  Your favorite dishes saved in one place. Order anytime you
                  want 🍕🍔
                </p>
              </div>
            </div>
          </div>

          <Heart
            size={160}
            className="absolute -bottom-10 -right-10 opacity-20"
          />
        </motion.div>

        {/* =================================
            STATS
        ================================= */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Favorite Items */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-orange-100 p-3">
                <Heart className="text-orange-500" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {favorites.length}
                </h2>

                <p className="text-gray-500">Favorite Items</p>
              </div>
            </div>
          </div>

          {/* Food */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-yellow-100 p-3">
                <Utensils className="text-yellow-500" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">Food</h2>

                <p className="text-gray-500">Delicious Choices</p>
              </div>
            </div>
          </div>

          {/* Ready */}
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-purple-100 p-3">
                <Sparkles className="text-purple-500" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">Ready</h2>

                <p className="text-gray-500">Order Anytime</p>
              </div>
            </div>
          </div>
        </div>

        {/* =================================
            FAVORITE FOOD
        ================================= */}

        {favorites.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-3xl bg-white p-10 text-center shadow-xl md:p-16"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
              <Heart size={50} className="text-orange-500" />
            </div>

            <h2 className="mt-8 text-2xl font-bold text-gray-700 md:text-3xl">
              No Favorite Foods Yet ❤️
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              You haven't saved any food yet. Explore restaurants and add your
              favorite dishes.
            </p>

            <button
              onClick={() => navigate("/restaurants")}
              className="mt-8 rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-orange-600"
            >
              Explore Restaurants 🍔
            </button>
          </motion.div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Favorite Foods
              </h2>

              <p className="mt-1 text-gray-500">
                Quickly find and order the dishes you love.
              </p>
            </div>

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
            >
              {favorites.map((food, index) => (
                <motion.div
                  key={food._id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                >
                  <MenuCard
                    menu={food}
                    isFavorite={true}
                    onFavoriteChange={(isFavorite) => {
                      if (!isFavorite) {
                        setFavorites((prev) =>
                          prev.filter((item) => item._id !== food._id),
                        );
                      }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    
  );
};

export default Favorites;
