import { useUserContext } from "../misc/UserContext";
import Moon from "../assets/moon.svg?react";

export const ThemeToggle = () => {
  const { user, changeTheme } = useUserContext();
  const isDark = user.theme === "dark";

  return (
    <button
      onClick={changeTheme}
      className="relative cursor-pointer flex items-center w-14 h-8 bg-dormant-dark dark:border-white border-1 rounded-full p-1"
    >
      <div
        className={`w-6 h-6 bg-active-dark dark:bg-dormant-dark rounded-full shadow-md transform transition-transform ${
          isDark ? "translate-x-0" : "translate-x-6"
        } flex items-center justify-center`}
      >
        {isDark && (
          <Moon className="fill-dormant-light size-4 transform-flat rotate-30" />
        )}
      </div>
    </button>
  );
};
