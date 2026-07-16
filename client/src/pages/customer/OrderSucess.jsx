import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-md w-full rounded-3xl bg-white p-10 text-center shadow-lg">
        <CheckCircle size={90} className="mx-auto text-green-500" />

        <h1 className="mt-6 text-3xl font-bold">Order Placed Successfully!</h1>

        <p className="mt-4 text-gray-600">
          Thank you for your order. Our restaurant has received it and will
          start preparing your food shortly.
        </p>

        <div className="mt-8 space-y-4">
          <Link
            to="/orders"
            className="block rounded-xl bg-orange-500 py-3 text-white font-semibold hover:bg-orange-600"
          >
            View My Orders
          </Link>

          <Link
            to="/"
            className="block rounded-xl border border-orange-500 py-3 text-orange-500 font-semibold hover:bg-orange-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
