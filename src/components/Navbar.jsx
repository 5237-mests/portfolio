import { NavLink } from "react-router-dom";
import { socialLinks } from "../constants";
import './style.css'

const Navbar = () => {
  return (
    <div className="header lg:w-9/12">
      <NavLink
        to="/"
        className="w-10 h-10 bg-white rounded-lg  items-center justify-center flex font-bold shadow-md hvr"
      >
        <p className="blue-gradient_text hvr">ME</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "text-blue-500 hvr" : "hvr")}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? "text-blue-500 hvr" : "hvr")}
        >
          Projects
        </NavLink>
        <NavLink
          to="https://drive.google.com/file/d/1qAoKeX6yEi3VGrPrIufkNlRgcIaivJld/view?usp=sharing"
          target="_blank"
          className={({ isActive }) => (isActive ? "text-blue-500 hvr" : "hvr")}
        >
          Resume
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "text-blue-500 hvr" : "hvr")}
        >
          Contact
        </NavLink>
        {
          socialLinks.map(({ name, link, iconUrl }) => (
              <NavLink
                key={name}
                to={link}
                target="_blank"
                className={`${({ isActive }) => (isActive ? "text-blue-500" : "")} flex justify-center items-center hvr`}
              >
                <img
                  className="w-5 object-contain"
                  src={iconUrl}
                  alt="arrow"
                />
              </NavLink>
          ))
        }
      </nav>
    </div>
  );
};

export default Navbar;
