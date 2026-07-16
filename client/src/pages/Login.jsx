import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

import logo from "../assets/fooddeliverylogo.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 const { updateUser } = useAuth();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleLogin = async (e) => {
   e.preventDefault();

   try {
     setLoading(true);
     setError("");

     const response = await api.post("/auth/login", formData);

     // Save token
     if (response.data.token) {
       localStorage.setItem("token", response.data.token);
     }

     // Save user in context
     updateUser(response.data.user);

     // Get role
     const role = response.data.user.role;

     if (role === "owner") {
       navigate("/owner/dashboard");
     } else if (role === "rider") {
       navigate("/rider/dashboard");
     } else {
       navigate("/");
     }
   } catch (error) {
     setError(error.response?.data?.message || "Invalid credentials");
   } finally {
     setLoading(false);
   }
 };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          {/* Logo */}

          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Foodie Logo"
              className="h-20 w-20 rounded-full border-4 border-orange-500 shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue ordering your favorite food
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="flex items-center gap-3 rounded-xl border px-4">
            <Mail className="text-orange-500" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-4 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 rounded-xl border px-4">
            <Lock className="text-orange-500" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-4 outline-none"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 py-4 font-bold text-white shadow-lg transition hover:bg-orange-600 disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500">
          New to Foodie?
          <Link
            to="/register"
            className="ml-2 font-semibold text-orange-500 hover:text-orange-600"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );};
export default Login;