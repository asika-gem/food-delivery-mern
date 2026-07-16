import { Home } from "lucide-react";
import { NavLink , Link } from "react-router-dom";

const Sidebar = ({ title, menu }) => {
  return (
    <aside className="w-72 bg-white shadow-lg">
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold text-orange-500">{title}</h2>
      </div>

      <nav className="mt-6 flex flex-col">
        {menu?.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `mx-4 mb-2 rounded-xl px-5 py-3 transition ${
                isActive ? "bg-orange-500 text-white" : "hover:bg-orange-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      {/* Back Home Button */}
      <div className=" p-4">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 rounded-xl bg-white border border-orange-500 px-5 py-3 text-orange-500 transition hover:bg-orange-500 hover:text-white"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
