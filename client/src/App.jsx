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

import Dashboard from "./pages/owner/Dashboard";
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
import LiveTracking from "./pages/customer/LiveTracking";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import { riderMenu } from "./constants/RiderMenu";
import { ownerMenu } from "./constants/OwnerMenu";
import Deliveries from "./pages/rider/Deliveries";

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
      <Route
        path="/customer/tracking/:orderId"
        element={
          <ProtectedRoute role="customer">
            <LiveTracking />
          </ProtectedRoute>
        }
      />

      {/* ================= OWNER ================= */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="owner">
            <DashboardLayout title="Owner Dashboard" menu={ownerMenu} />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Restaurant */}
        <Route path="restaurant" element={<Restaurant />} />

        <Route path="create-restaurant" element={<CreateRestaurant />} />

        <Route path="restaurant/edit/:id" element={<EditRestaurant />} />

        {/* Menu */}
        <Route path="menu" element={<Menu />} />

        <Route path="menu/create" element={<CreateMenu />} />

        <Route path="menu/edit/:id" element={<EditMenu />} />

        {/* Orders */}
        <Route path="orders" element={<OwnerOrders />} />

        {/* Profile */}
        <Route path="profile" element={<OwnerProfile />} />
      </Route>

      {/* ================= RIDER ================= */}
      <Route
        path="/rider"
        element={
          <ProtectedRoute role="rider">
            <DashboardLayout title="Rider Dashboard" menu={riderMenu} />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<RiderDashboard />} />
        <Route path="orders" element={<RiderOrders />} />
        <Route path="profile" element={<RiderProfile />} />
        <Route path="delivery" element={<Deliveries />} />
      </Route>
    </Routes>
  );
}

export default App;
