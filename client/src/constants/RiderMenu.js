import { ClipboardList, LayoutDashboard, Truck, User } from "lucide-react";

export const riderMenu = [
  {
    name: "Dashboard",
    path: "/rider/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Deliveries",
    path: "/rider/delivery",
    icon: Truck,
  },
  {
    name: "Profile",
    path: "/rider/profile",
    icon: User,
  },
  {
    name: "Orders",
    path: "/rider/orders",
    icon: ClipboardList,
  },
];
