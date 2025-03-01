import {
  createContext,
  useEffect,
  useState,
  useContext,
  PropsWithChildren,
} from "react";

type ThemeContextType = "light" | "dark";

interface User {
  theme: ThemeContextType;
  favorites: number[];
}

interface StoreContext {
  user: User;
  changeTheme: () => void;
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
}

export const UserContext = createContext<StoreContext | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { favorites: [], theme: "dark" };
  });

  const getUser = (): User | null => {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as User) : null;
  };

  useEffect(() => {
    const storedUser = getUser();
    if (!storedUser) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (!user?.theme) return;
    if (user.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [user?.theme]);

  const changeTheme = () => {
    if (!user) return;
    const updatedUser = {
      ...user,
      theme: user.theme === "dark" ? "light" : "dark",
    };
    setUser(updatedUser as User);
  };

  const addToFavorites = (id: number) => {
    if (!user) return;
    if (!user.favorites.includes(id)) {
      const updatedUser = {
        ...user,
        favorites: [...user.favorites, id],
      };
      setUser(updatedUser);
    }
  };

  const removeFromFavorites = (id: number) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      favorites: user.favorites.filter((favId) => favId !== id),
    };
    setUser(updatedUser);
  };

  const contextValue = {
    user,
    changeTheme,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
