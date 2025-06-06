import Sidebar from "./sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 min-h-screen bg-gray-100">
        <Topbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
