import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth} from "../../context/AuthContext"

const MenuCard = ({ menu }) => {
  const { addToCart } = useCart();
  const { currentUser} = useAuth();
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-3xl bg-white shadow-lg"
    >
      <img
        src={menu.image}
        alt={menu.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{menu.name}</h3>

          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            4.8
          </span>
        </div>

        <p className="mt-3 text-gray-500">{menu.description}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-500">
            Rs. {menu.price}
          </span>

          {currentUser?.role === "customer" && (
            <button
              onClick={() => addToCart(menu)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition"
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
