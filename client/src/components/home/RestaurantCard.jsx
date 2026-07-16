import { motion } from "framer-motion";
import { Star, Clock, MapPin, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const [liked, setLiked] = useState(false);

  // Prevent crash if data is missing
  if (!restaurant) return null;

  return (
  <Link to={`/restaurants/${restaurant._id}`}>
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-3xl bg-white shadow-lg"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={restaurant.coverImage || restaurant.profileImage}
          alt={restaurant.name}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-110
          "
        />

        {/* Open Badge */}
        <span
          className="
            absolute
            left-4
            top-4
            rounded-full
            bg-green-500
            px-4
            py-1
            text-sm
            font-semibold
            text-white
          "
        >
          Open Now
        </span>

        {/* Favourite Button */}
        <button
          onClick={() => setLiked(!liked)}
          className="
            absolute
            right-4
            top-4
            rounded-full
            bg-white
            p-3
            shadow-md
          "
        >
          <Heart
            size={20}
            className={liked ? "fill-red-500 text-red-500" : "text-gray-600"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="
          text-xl
          font-bold
          text-gray-900
        "
        >
          {restaurant.name}
        </h3>

        <p
          className="
          mt-1
          text-sm
          text-gray-500
        "
        >
          {restaurant.cuisineType}
        </p>

        <div
          className="
          mt-4
          flex
          items-center
          justify-between
        "
        >
          {/* Rating */}
          <div
            className="
            flex
            items-center
            gap-1
            rounded-full
            bg-yellow-50
            px-3
            py-1
          "
          >
            <Star size={16} className="fill-yellow-400 text-yellow-400" />

            <span className="font-semibold">{restaurant.rating || "4.5"}</span>
          </div>

          {/* Delivery Time */}
          <div
            className="
            flex
            items-center
            gap-1
            text-sm
            text-gray-500
          "
          >
            <Clock size={16} />

            {restaurant.time || "30 min"}
          </div>
        </div>

        {/* Location */}
        <div
          className="
          mt-4
          flex
          items-center
          gap-2
          text-sm
          text-gray-500
        "
        >
          <MapPin size={16} />

          {restaurant.location || "Nearby"}
        </div>
      </div>
    </motion.div>
  
    </Link>
  );
  
};

export default RestaurantCard;
