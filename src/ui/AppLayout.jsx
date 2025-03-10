import { Outlet } from "react-router-dom";
import NavBar from "./nav/Navbar";
function AppLayout() {
  return (
    <div className="p-3 h-screen flex flex-col bg-gray-100 font-roboto">
      <div className="bg-white p-1 rounded-lg shadow-md max-w-7xl mx-auto w-full flex flex-1 flex-col overflow-hidden">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
