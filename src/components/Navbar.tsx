/// <reference types="vite-plugin-svgr/client" />
import { ThemeToggle } from "./ThemeToggle";
import { NavLink } from "react-router";
import Logo from "../assets/logo.svg?react";

export const Navbar = () => {
  return (
    <nav className="flex justify-between  md:px-4 sm:px-8 px-16 mr-auto ml-auto  max-w-7xl">
      <div className="flex">
        <Logo className="w-40 dark:fill-active-dark fill-background-dark" />
        <ThemeToggle />
      </div>
      <ul className="flex gap-2">
        <li className="mt-auto mb-auto text-xl">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            Home
          </NavLink>
        </li>
        <li className="mt-auto mb-auto text-xl">
          <NavLink
            className={({ isActive }) => (isActive ? "underline" : "")}
            to="/favorites"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
