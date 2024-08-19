import Sidebar from "../../components/admin/Sidebar";
import { Outlet } from "react-router-dom";
const AdminHome = () => {
  return (
    <main className="min-h-[100vh] flex">
      <aside className="w-[20%]">
        <Sidebar />
      </aside>
      <div className="w-[80%] p-5 ">
        <Outlet />
      </div>
    </main>
  );
};

export default AdminHome;
