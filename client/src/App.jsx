import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

import CustomerLayout from "./components/layout/CustomerLayout";

import CustomerDashboard from "./pages/customer/Dashboard";
import MyOrders from "./pages/customer/MyOrder";
import Favorites from "./pages/customer/Favorites";
import Reviews from "./pages/customer/Reviews";
import CustomerProfile from "./pages/customer/Profile";

import Cart from "./pages/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSucess";

import OwnerDashboard from "./pages/owner/Dashboard";
import Restaurant from "./pages/owner/Resturant";
import CreateRestaurant from "./pages/owner/CreateRestaurant";
import EditRestaurant from "./pages/owner/EditRestaurant";
import Menu from "./pages/owner/Menu";
import CreateMenu from "./pages/owner/CreateMenu";
import EditMenu from "./pages/owner/EditMenu";
import OwnerOrders from "./pages/owner/Order";
import OwnerProfile from "./pages/owner/Profile";

import RiderDashboard from "./pages/rider/Dashboard";
import RiderOrders from "./pages/rider/Orders";
import RiderProfile from "./pages/rider/Profile";

import RestaurantDetails from "./pages/RestaurantDetails";
import FeaturedRestaurants from "./components/home/FeaturedResturants";

import About from "./pages/About";
import Contact from "./pages/Contact";

import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC WEBSITE ================= */}

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="restaurants" element={<FeaturedRestaurants />} />

        <Route path="restaurants/:id" element={<RestaurantDetails />} />

        <Route path="aboutus" element={<About />} />

        <Route path="contact" element={<Contact />} />
      </Route>

      {/* ================= AUTH ================= */}

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      {/* ================= CUSTOMER ================= */}

      <Route
        path="/customer"
        element={
          <ProtectedRoute role="customer">
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CustomerDashboard />} />

        <Route path="orders" element={<MyOrders />} />

        <Route path="favorites" element={<Favorites />} />

        <Route path="reviews" element={<Reviews />} />

        <Route path="profile" element={<CustomerProfile />} />
      </Route>

      {/* ================= CART / CHECKOUT ================= */}

      <Route path="/cart" element={<Cart />} />

      <Route path="/checkout" element={<Checkout />} />

      <Route path="/order-success" element={<OrderSuccess />} />

      {/* ================= OWNER ================= */}

      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute role="owner">
            <OwnerDashboard />
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

      <Route
        path="/owner/menu/create"
        element={
          <ProtectedRoute role="owner">
            <CreateMenu />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/menu/edit/:id"
        element={
          <ProtectedRoute role="owner">
            <EditMenu />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/orders"
        element={
          <ProtectedRoute role="owner">
            <OwnerOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/profile"
        element={
          <ProtectedRoute role="owner">
            <OwnerProfile />
          </ProtectedRoute>
        }
      />

      {/* ================= RIDER ================= */}

      <Route
        path="/rider/dashboard"
        element={
          <ProtectedRoute role="rider">
            <RiderDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/rider/orders"
        element={
          <ProtectedRoute role="rider">
            <RiderOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/rider/profile"
        element={
          <ProtectedRoute role="rider">
            <RiderProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
