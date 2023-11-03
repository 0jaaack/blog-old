import Image from "next/image";
import { DEFAULT_THEME, Theme, USER } from "../../constants";
import { useCallback, useMemo, useState } from "react";

import * as css from "./ThemeToggleIcon.css";

export function ThemeToggleIcon() {
  const [theme, setTheme] = useState<Theme>(
    ((): Theme => {
      if (typeof window === "undefined") {
        return DEFAULT_THEME;
      }
      const theme = localStorage.getItem("theme") ?? DEFAULT_THEME;

      return theme === "dark" || theme === "light" ? theme : DEFAULT_THEME;
    })()
  );
  const toggleTheme = useCallback(() => {
    const currentTheme = localStorage.getItem("theme") ?? DEFAULT_THEME;
    const theme = currentTheme === "light" ? "dark" : "light";

    localStorage.setItem("theme", theme);

    document.body.classList.remove(currentTheme);
    document.body.classList.add(theme);

    setTheme(theme);
  }, []);

  return (
    <Image
      src={theme === "light" ? "/images/moon.svg" : "/images/sun.svg"}
      alt="toggle dark mode"
      width="24"
      height="24"
      className={css.icon}
      onClick={toggleTheme}
    />
  );
}
