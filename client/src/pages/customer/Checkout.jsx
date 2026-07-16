import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { api } from "../../services/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryCharge = 100;

  const totalAmount = subtotal + deliveryCharge;

  const handlePlaceOrder = async () => {
    if (!address || !phone) {
      alert("Please fill all fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/orders", {
        restaurant: cart[0].restaurant?._id || cart[0].restaurant,
        items: cart.map((item) => ({
          menu: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount,
        address,
        phone,
      });

      clearCart();

      navigate("/order-success");
    } catch (err) {
      console.log(err);
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-10">
      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-3 px-6">
        {/* Left */}

        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold">Phone Number</label>

              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border p-4 outline-none focus:border-orange-500"
                placeholder="98xxxxxxxx"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Delivery Address
              </label>

              <textarea
                rows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border p-4 outline-none focus:border-orange-500"
                placeholder="Enter delivery address"
              />
            </div>

            <div>
              <h2 className="font-semibold mb-3">Payment Method</h2>

              <div className="rounded-xl border p-4">Cash on Delivery</div>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="bg-white rounded-2xl p-8 shadow h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          {cart.map((item) => (
            <div key={item._id} className="flex justify-between mb-3">
              <span>
                {item.name} x {item.quantity}
              </span>

              <span>Rs. {item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-5" />

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>

            <span>Rs. {subtotal}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery</span>

            <span>Rs. {deliveryCharge}</span>
          </div>

          <div className="flex justify-between text-xl font-bold mt-5">
            <span>Total</span>

            <span>Rs. {totalAmount}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-orange-500 py-4 text-white font-semibold hover:bg-orange-600"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
