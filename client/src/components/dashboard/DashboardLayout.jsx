import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ title, menu }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        {/* Sticky Sidebar */}
        <aside className="sticky top-0 h-screen shrink-0">
          <Sidebar menu={menu} />
        </aside>

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Sticky Topbar */}
          <header className="sticky top-0 z-40">
            <Topbar title={title} />
          </header>

          {/* Outlet Content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
