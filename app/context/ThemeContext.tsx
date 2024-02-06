"use client";

import { createContext, useState, useEffect } from "react";
import Loader from "../components/Common/Loader/Loader";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  if (!isMounted) {
    return <Loader />;
  }

  const changeTheme = (theme: string) => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    theme === "business"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
