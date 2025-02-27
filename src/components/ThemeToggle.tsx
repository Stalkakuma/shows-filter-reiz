"use client";

import { useStore } from "../misc/UserContext";
// import { SunIcon } from "@heroicons/react/24/solid";

export const ThemeToggle = () => {
  const { theme, changeTheme } = useStore();

  return (
    <label className="relative flex justify-between items-center p-2 text-xl">
      <input
        type="checkbox"
        className="absolute  left-0 top-0 w-full h-full appearance-none peer rounded-md"
        onChange={changeTheme}
        value={theme}
      />
      <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6"></span>
    </label>
  );
};
