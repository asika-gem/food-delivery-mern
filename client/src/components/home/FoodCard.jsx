import { motion } from "framer-motion";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import {useAuth} from "../../context/AuthContext";

const FoodCard = ({ food }) => {
  const [liked, setLiked] = useState(false);
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="
rounded-3xl
overflow-hidden
bg-white
shadow-lg
"
    >
      <div
        className="
relative
h-52
overflow-hidden
"
      >
        <img
          src={food.image}
          alt={food.name}
          className="
h-full
w-full
object-cover
"
        />

        <button
          onClick={() => setLiked(!liked)}
          className="
absolute
right-4
top-4
rounded-full
bg-white
p-3
"
        >
          <Heart
            className={liked ? "fill-red-500 text-red-500" : "text-gray-600"}
          />
        </button>
      </div>

      <div className="p-5">
        <div
          className="
flex
justify-between
items-center
"
        >
          <h3
            className="
text-xl
font-bold
"
          >
            {food.name}
          </h3>

          <div
            className="
flex
gap-1
items-center
"
          >
            <Star
              size={16}
              className="
fill-yellow-400
text-yellow-400
"
            />

            {food.rating}
          </div>
        </div>

        <p
          className="
mt-2
text-gray-500
"
        >
          {food.restaurant?.name}
        </p>

        <div
          className="
mt-5
flex
justify-between
items-center
"
        >
          <h4
            className="
text-2xl
font-bold
text-orange-500
"
          >
            Rs. {food.price}
          </h4>

          <button
            disabled={currentUser?.role !== "customer"}
            onClick={() => addToCart(food)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 transition ${
              currentUser?.role === "customer"
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
