import {
  LayoutDashboard,
  ClipboardList,
  Heart,
  Star,
  User,
  ShoppingCart,
} from "lucide-react";

const customerMenu = [
  {
    name: "Dashboard",
    path: "/customer/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Orders",
    path: "/customer/orders",
    icon: ClipboardList,
  },
  {
    name: "Favorites",
    path: "/customer/favorites",
    icon: Heart,
  },
  {
    name: "Reviews",
    path: "/customer/reviews",
    icon: Star,
  },
  {
    name: "Profile",
    path: "/customer/profile",
    icon: User,
  },
  {
    name: "My Cart",
    path: "/cart",
    icon: ShoppingCart,
  },
];

export default customerMenu;