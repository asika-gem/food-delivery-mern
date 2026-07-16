import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children, title, menu }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar title={title} menu={menu} />

      <div className="flex-1">
        <Topbar />

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
