import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import OwnerDashboard from "./pages/owner/Dashboard";
import CustomerDashboard from "./pages/customer/Dashboard";
import RiderDashboard from "./pages/rider/Dashboard";
import Restaurant from "./pages/owner/Resturant";
import CreateRestaurant from "./pages/owner/CreateRestaurant";
import EditRestaurant from "./pages/owner/EditRestaurant";
import Menu from "./pages/owner/Menu";
import CreateMenu from "./pages/owner/CreateMenu";
import EditMenu from "./pages/owner/EditMenu";
import RestaurantDetails from "./pages/RestaurantDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSucess";
import MyOrders from "./pages/customer/MyOrder";
import FeaturedRestaurants from "./components/home/FeaturedResturants";
import OwnerOrders from "./pages/owner/Order";
import RiderOrders from "./pages/rider/Orders";
import RiderProfile from "./pages/rider/Profile";
import OwnerProfile from "./pages/owner/Profile";
import CustomerProfile from "./pages/customer/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Layout from "./components/layout/Layout";
import Favorites from "./pages/customer/Favorites";
import Reviews from "./pages/customer/Reviews";

function App() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/restaurants" element={<FeaturedRestaurants />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute role="owner">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute role="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rider/dashboard"
          element={
            <ProtectedRoute role="rider">
              <RiderDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/restaurant"
          element={
            <ProtectedRoute role="owner">
              <Restaurant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/create-restaurant"
          element={
            <ProtectedRoute role="owner">
              <CreateRestaurant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/restaurant/edit/:id"
          element={
            <ProtectedRoute role="owner">
              <EditRestaurant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/menu"
          element={
            <ProtectedRoute role="owner">
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route path="/owner/orders" element={<OwnerOrders />} />
        <Route path="/owner/menu/create" element={<CreateMenu />} />
        <Route path="/owner/menu/edit/:id" element={<EditMenu />} />
        <Route path="/rider/dashboard" element={<RiderDashboard />} />
        <Route path="/rider/orders" element={<RiderOrders />} />
        <Route path="/rider/profile" element={<RiderProfile />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/owner/profile" element={<OwnerProfile />} />
        <Route path="favorites" element={<Favorites />} />
        <Route
          path="/customer/reviews"
          element={
            <ProtectedRoute role="customer">
              <Reviews />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
