/// <reference types="vite-plugin-svgr/client" />
import { ThemeToggle } from "./ThemeToggle";
import { NavLink } from "react-router";
import Logo from "../assets/logo.svg?react";

export const Navbar = () => {
  return (
    <nav className="flex w-full justify-between">
      <div className="flex place-items-center gap-5">
        <Logo className="w-40 dark:fill-active-dark fill-background-dark" />
        <ThemeToggle />
      </div>
      <ul className="flex gap-2">
        <li className="mt-auto mb-auto md:text-xl">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "underline" : ""
              } hover:text-active-dark hover:brightness-120 hover:duration-300 hover:ease-in`
            }
          >
            HOME
          </NavLink>
        </li>
        <li className="mt-auto mb-auto md:text-xl">
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "underline" : ""
              } hover:text-active-dark hover:brightness-120 hover:duration-300 hover:ease-in`
            }
            to="/favorites"
          >
            FAVORITES
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
