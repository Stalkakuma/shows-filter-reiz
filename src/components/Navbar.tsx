import { ThemeToggle } from "./ThemeToggle";
import { NavLink } from "react-router";

export const Navbar = () => {
  return (
    <nav className="flex justify-between  md:px-4 sm:px-8 px-16 mr-auto ml-auto  max-w-7xl">
      <div>
        <p>Logo</p>
        <ThemeToggle />
      </div>
      <ul className="flex gap-2">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Favorites</NavLink>
        </li>
      </ul>
    </nav>
  );
};
