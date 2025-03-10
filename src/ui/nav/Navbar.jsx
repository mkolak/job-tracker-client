import { NavLink } from "react-router-dom";
import NavbarLink from "./NavbarLink";
import { FiBriefcase } from "react-icons/fi";
import Avatar from "./Avatar";

function NavBar() {
  return (
    <nav className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 gap-1">
      <div className="text-gray-900 flex gap-8 md:gap-20 items-center">
        <NavLink
          to="/"
          className="hover:text-stone-100 hover:bg-teal-600 text-xl font-bold flex items-center gap-2 bg-teal-500 text-white rounded-md p-2 transition-colors"
        >
          <FiBriefcase />
          <h1 className="hidden sm:inline">JobTracker</h1>
        </NavLink>
        <div className="flex gap-3 md:gap-6 text-base">
          <NavbarLink to="/dashboard">Dashboard</NavbarLink>
          <NavbarLink to="/jobs">Jobs</NavbarLink>
          <NavbarLink to="/manage">Manage</NavbarLink>
        </div>
      </div>
      <Avatar />
    </nav>
  );
}

export default NavBar;
