import { Outlet } from "react-router-dom";
import DashboardLayout from "../dashboard/DashboardLayout";
import customerMenu from "../dashboard/customerMenu";

const CustomerLayout = () => {
  return (
    <DashboardLayout title="Customer" menu={customerMenu}>
      <Outlet />
    </DashboardLayout>
  );
};

export default CustomerLayout;
