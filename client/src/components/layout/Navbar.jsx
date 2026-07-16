import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, MapPin, LogOut } from "lucide-react";

import logo from "../../assets/fooddeliverylogo.png";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { currentUser, logout } = useAuth();
  const { cart } = useCart();

  const isGuest = !currentUser;
  const isCustomer = currentUser?.role === "customer";
  const isOwner = currentUser?.role === "owner";
  const isRider = currentUser?.role === "rider";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Restaurants", path: "/restaurants" },
    { name: "Offers", path: "/offers" },
    { name: "Contact", path: "/contact" },
    {name: "AboutUs", path:"/aboutus"}
  ];

  const getDashboardLink = () => {
    if (!currentUser) return "/login";

    switch (currentUser.role) {
      case "customer":
        return "/customer/dashboard";

      case "owner":
        return "/owner/dashboard";

      case "rider":
        return "/rider/dashboard";

      default:
        return "/";
    }
  };

  const getProfileLink = () => {
    if (!currentUser) return "/login";

    switch (currentUser.role) {
      case "customer":
        return "/customer/profile";

      case "owner":
        return "/owner/profile";

      case "rider":
        return "/rider/profile";

      default:
        return "/";
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-orange-100 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-5 lg:px-12 xl:px-20">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-orange-500 bg-orange-500 shadow-lg">
            <img
              src={logo}
              alt="logo"
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Foodie</h1>

            <p className="-mt-1 text-xs text-gray-500">Fast Delivery</p>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-16 lg:flex">
          {(isGuest || isCustomer) &&
            navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition ${
                    isActive
                      ? "text-orange-500"
                      : "text-gray-700 hover:text-orange-500"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
        </nav>

        {/* Desktop Right */}

        <div className="hidden items-center gap-4 lg:flex">
          {(isGuest || isCustomer) && (
            <button className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 transition hover:bg-orange-100">
              <MapPin size={18} className="text-orange-500" />

              <span className="text-sm font-medium">Deliver To</span>
            </button>
          )}

          {isCustomer && (
            <Link
              to="/cart"
              className="relative rounded-full bg-gray-100 p-3 transition hover:bg-orange-100"
            >
              <ShoppingCart size={20} />

              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          )}

          {currentUser ? (
            <>
              <Link
                to={getDashboardLink()}
                className="rounded-full bg-orange-500 px-5 py-2 font-semibold text-white transition hover:bg-orange-600"
              >
                Dashboard
              </Link>

              <Link
                to={getProfileLink()}
                className="flex items-center gap-2 rounded-full border border-orange-500 px-5 py-2 text-orange-500 transition hover:bg-orange-500 hover:text-white"
              >
                <User size={18} />
                <span>{currentUser.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-orange-500 px-5 py-2 text-orange-500 transition hover:bg-orange-500 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-orange-500 px-5 py-2 font-semibold text-white transition hover:bg-orange-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}

        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile Menu */}

      {menuOpen && (
        <div className="border-t bg-white lg:hidden">
          <div className="flex flex-col gap-4 p-6">
            {(isGuest || isCustomer) &&
              navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-lg font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                >
                  {item.name}
                </Link>
              ))}

            {isCustomer && (
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-lg font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
              >
                <ShoppingCart size={22} />
                Cart
                {cart.length > 0 && (
                  <span className="ml-auto rounded-full bg-orange-500 px-2 py-1 text-xs text-white">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>
            )}

            {currentUser ? (
              <>
                <Link
                  to={getDashboardLink()}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-orange-500 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
                >
                  Dashboard
                </Link>

                <Link
                  to={getProfileLink()}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-orange-500 py-3 text-center font-semibold text-orange-500 transition hover:bg-orange-50"
                >
                  {currentUser.name}
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-orange-500 py-3 text-center font-semibold text-orange-500 transition hover:bg-orange-50"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-orange-500 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;