import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="flex justify-between mr-auto ml-auto  max-w-7xl">
      <div>
        <p>Logo</p>
        <ThemeToggle />
      </div>
      <ul className="flex gap-2">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/favorites">Favorites</a>
        </li>
      </ul>
    </nav>
  );
};
