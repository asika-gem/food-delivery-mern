import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, Store, Bike } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    try {
      setIsLoading(true);

      const res = await api.post("/auth/register", formData);

      console.log(res.data);

      toast.success("Account created successfully");

      navigate("/login");
    } catch (error) {
      console.log("Backend Error:", error.response?.data);

      console.log("Validation Errors:", error.response?.data?.errors);

      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="
min-h-screen
flex
items-center
justify-center
bg-linear-to-br
from-orange-50
via-white
to-red-50
px-6
py-20
"
    >
      <div
        className="
w-full
max-w-lg
rounded-3xl
bg-white
p-8
shadow-2xl
"
      >
        {/* Heading */}

        <div className="text-center mb-8">
          <h1
            className="
text-4xl
font-extrabold
text-gray-900
"
          >
            Create Account
          </h1>

          <p
            className="
mt-2
text-gray-500
"
          >
            Join Foodie today
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
space-y-5
"
        >
          {/* Name */}

          <div
            className="
flex
items-center
gap-3
rounded-xl
border
px-4
"
          >
            <User className="text-orange-500" />

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="
                    w-full
                    py-3
                    outline-none
"
            />
          </div>

          {/* Email */}

          <div
            className="
flex
items-center
gap-3
rounded-xl
border
px-4
"
          >
            <Mail className="text-orange-500" />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="
w-full
py-3
outline-none
"
            />
          </div>

          {/* Phone */}

          <div
            className="
flex
items-center
gap-3
rounded-xl
border
px-4
"
          >
            <Phone className="text-orange-500" />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="
w-full
py-3
outline-none
"
            />
          </div>

          {/* Password */}

          <div
            className="
flex
items-center
gap-3
rounded-xl
border
px-4
"
          >
            <Lock className="text-orange-500" />

            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="
w-full
py-3
outline-none
"
            />
          </div>

          {/* Role Selection */}

          <div>
            <p
              className="
mb-3
font-semibold
text-gray-700
"
            >
              Register As
            </p>

            <div
              className="
grid
grid-cols-3
gap-3
"
            >
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "customer",
                  })
                }
                className={`rounded-xl border p-4 flex flex-col items-center gap-2 transition
${
  formData.role === "customer"
    ? "bg-orange-500 text-white"
    : "hover:border-orange-500"
}
`}
              >
                <User size={25} />
                Customer
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "owner",
                  })
                }
                className={`rounded-xl border p-4 flex flex-col items-center gap-2 transition
${
  formData.role === "owner"
    ? "bg-orange-500 text-white"
    : "hover:border-orange-500"
}
`}
              >
                <Store size={25} />
                Owner
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "rider",
                  })
                }
                className={`rounded-xl border p-4 flex flex-col items-center gap-2 transition
${
  formData.role === "rider"
    ? "bg-orange-500 text-white"
    : "hover:border-orange-500"
}
`}
              >
                <Bike size={25} />
                Rider
              </button>
            </div>
          </div>

          <button
            className="
w-full
rounded-xl
bg-orange-500
py-4
font-bold
text-white
shadow-lg
hover:bg-orange-600
transition
"
          >
            Create Account
          </button>
        </form>

        <p
          className="
mt-6
text-center
text-gray-600
"
        >
          Already have an account?
          <Link
            to="/login"
            className="
ml-2
font-semibold
text-orange-500
"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
