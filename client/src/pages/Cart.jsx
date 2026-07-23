import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    total,
  } = useCart();

  // =========================
  // CUSTOMER ACCESS CHECK
  // =========================

  if (!currentUser || currentUser.role !== "customer") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-50">
        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
          <ShoppingBag
            size={60}
            className="mx-auto text-orange-500"
          />

          <h2 className="mt-5 text-3xl font-bold text-gray-800">
            Cart Unavailable
          </h2>

          <p className="mt-3 text-gray-500">
            Only customers can use the shopping cart.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50">
        <ShoppingBag
          size={90}
          className="text-orange-500"
        />

        <h2 className="mt-6 text-3xl font-bold text-gray-800">
          Your Cart is Empty
        </h2>

        <p className="mt-2 text-gray-500">
          Add some delicious food to your cart.
        </p>

        <Link
          to="/restaurants"
          className="mt-8 rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  // =========================
  // MAIN CART
  // =========================

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            My Cart
          </h1>

          <p className="mt-2 text-gray-500">
            Review your selected food items before checkout.
          </p>
        </div>

        {/* CART CONTENT */}

        <div className="grid gap-10 lg:grid-cols-3">

          {/* =========================
              CART ITEMS
          ========================= */}

          <div className="space-y-6 lg:col-span-2">

            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-5 rounded-3xl bg-white p-5 shadow transition hover:shadow-lg sm:flex-row sm:items-center"
              >

                {/* IMAGE */}

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-full rounded-2xl object-cover sm:w-28"
                />

                {/* DETAILS */}

                <div className="flex-1">

                  <h2 className="text-xl font-bold text-gray-800">
                    {item.name}
                  </h2>

                  <p className="mt-2 font-semibold text-orange-500">
                    Rs. {item.price}
                  </p>

                  {/* QUANTITY */}

                  <div className="mt-4 flex items-center gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                      className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="min-w-8 text-center text-lg font-bold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                      className="rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
                    >
                      <Plus size={18} />
                    </button>

                  </div>
                </div>

                {/* PRICE + DELETE */}

                <div className="flex items-center justify-between sm:block sm:text-right">

                  <div>
                    <p className="text-sm text-gray-400">
                      Total
                    </p>

                    <h3 className="text-xl font-bold text-gray-800">
                      Rs. {item.price * item.quantity}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeFromCart(item._id)
                    }
                    className="text-red-500 transition hover:text-red-700 sm:mt-6"
                  >
                    <Trash2 size={22} />
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <div>

            <div className="sticky top-28 rounded-3xl bg-white p-8 shadow-lg">

              <h2 className="text-2xl font-bold text-gray-800">
                Order Summary
              </h2>

              <div className="mt-8 space-y-4">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>

                  <span>
                    Rs. {total}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>

                  <span>
                    Rs. 100
                  </span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>

                  <span className="text-orange-500">
                    Rs. {total + 100}
                  </span>
                </div>

              </div>

              {/* CHECKOUT */}

              <button
                type="button"
                onClick={() =>
                  navigate("/checkout")
                }
                className="mt-8 w-full rounded-xl bg-orange-500 py-4 font-semibold text-white transition hover:bg-orange-600"
              >
                Proceed to Checkout
              </button>

              {/* CONTINUE SHOPPING */}

              <Link
                to="/restaurants"
                className="mt-4 block text-center font-medium text-orange-500 transition hover:text-orange-600"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Cart;