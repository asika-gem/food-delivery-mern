import { Home } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

const Sidebar = ({ title = "Dashboard", menu = [] }) => {
  return (
    <aside className="flex min-h-screen w-72 flex-col bg-white shadow-lg">
      {/* Logo / Title */}
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold text-orange-500">{title}</h2>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex flex-1 flex-col">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mx-4 mb-2 flex items-center gap-3 rounded-xl px-5 py-3 transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-orange-100"
                }`
              }
            >
              {Icon && <Icon size={20} />}
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Back Home */}
      <div className="border-t p-4">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 rounded-xl border border-orange-500 px-5 py-3 text-orange-500 transition hover:bg-orange-500 hover:text-white"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
