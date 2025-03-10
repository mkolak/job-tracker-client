import { NavLink } from "react-router-dom";

function NavbarLink({ children, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-gray-600 hover:font-semibold transition-all ${
          isActive ? " font-semibold border-b border-gray-900 pb-0.5" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default NavbarLink;
