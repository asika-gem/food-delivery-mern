import {
  LayoutDashboard,
  Store,
  UtensilsCrossed,
  ClipboardList,
  Star,
  User,
} from "lucide-react";

export const ownerMenu = [
  {
    name: "Dashboard",
    path: "/owner/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Restaurant",
    path: "/owner/restaurant",
    icon: Store,
  },
  {
    name: "Menu",
    path: "/owner/menu",
    icon: UtensilsCrossed,
  },
  {
    name: "Orders",
    path: "/owner/orders",
    icon: ClipboardList,
  },
  {
    name: "Profile",
    path: "/owner/profile",
    icon: User,
  },
];