"use client";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("data-theme", "corporate");

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
