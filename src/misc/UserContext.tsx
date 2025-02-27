import {
  createContext,
  useEffect,
  useState,
  useContext,
  PropsWithChildren,
} from "react";
// import { useLocation, useNavigate } from "react-router-dom";

type ThemeContextType = "light" | "dark";

interface StoreContext {
  theme: ThemeContextType;
  changeTheme: () => void;
}

export const UserContext = createContext<StoreContext | undefined>(undefined);

export const StoreProvider = ({ children }: PropsWithChildren) => {
  //   const [theme, setTheme] = useState<"light" | "dark">(
  //     typeof window !== "undefined" &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches
  //       ? "dark"
  //       : "light"
  //   );
  const [theme, setTheme] = useState<ThemeContextType>("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const changeTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const contextValue = {
    theme,
    changeTheme,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
