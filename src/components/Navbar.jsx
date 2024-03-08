import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="header lg:w-9/12">
      <NavLink
        to="/"
        className="w-10 h-10 bg-white rounded-lg  items-center justify-center flex font-bold shadow-md"
      >
        <p className="blue-gradient_text">AH</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "text-blue-500" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? "text-blue-500" : "")}
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "text-blue-500" : "")}
        >
          Contact
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
1000387173475;
