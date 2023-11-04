import { DEFAULT_THEME } from "../../constants";
import { useCallback } from "react";

import * as css from "./ThemeToggleIcon.css";

export function ThemeToggleIcon() {
  const toggleTheme = useCallback(() => {
    const currentTheme = localStorage.getItem("theme") ?? DEFAULT_THEME;
    const theme = currentTheme === "light" ? "dark" : "light";

    localStorage.setItem("theme", theme);

    document.body.classList.remove(currentTheme);
    document.body.classList.add(theme);

    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
  }, []);

  return <div className={css.icon} onClick={toggleTheme} />;
}
