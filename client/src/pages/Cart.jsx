import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
const Cart = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, total } =
    useCart();
if (!currentUser || currentUser.role !== "customer") {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
        <ShoppingBag size={60} className="mx-auto text-orange-500" />

        <h2 className="mt-5 text-3xl font-bold">Cart Unavailable</h2>

        <p className="mt-3 text-gray-500">
          Only customers can use the shopping cart.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
  if (cart.length === 0) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
        <ShoppingBag size={90} className="text-orange-500" />

        <h2 className="mt-6 text-3xl font-bold">Your Cart is Empty</h2>

        <p className="mt-2 text-gray-500">
          Add some delicious food to your cart.
        </p>

        <Link
          to="/"
          className="mt-8 rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen pt-28 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-10 text-4xl font-bold">My Cart</h1>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-6 rounded-3xl bg-white p-5 shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-28 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-bold">{item.name}</h2>

                  <p className="mt-2 text-orange-500 font-semibold">
                    Rs. {item.price}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="text-lg font-bold">{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="text-xl font-bold">
                    Rs. {item.price * item.quantity}
                  </h3>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-6 text-red-500 hover:text-red-700"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="rounded-3xl bg-white p-8 shadow sticky top-28">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {total}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>Rs. 100</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>Rs. {total + 100}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full rounded-xl bg-orange-500 py-4 text-white font-semibold hover:bg-orange-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
