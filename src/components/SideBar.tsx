import Image from "next/image";

import { DEFAULT_THEME, Theme, USER } from "../constants";
import * as css from "./SideBar.css";
import { useCallback, useMemo, useState } from "react";

export function SideBar() {
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
    <section className={css.layout}>
      <div className={css.profile}>
        <Image
          src={USER.PROFILE_IMAGE_PATH}
          width={84}
          height={84}
          alt={`${USER.NAME} profile image`}
          className={css.profileImage}
        />
        <span className={css.profileName}>{USER.NAME}</span>
        <p className={css.description}>{USER.DESCRIPTION}</p>
      </div>

      <ul className={css.iconList}>
        <li>
          <a href={USER.GITHUB_URL} target="_blank">
            <Image
              src="/images/github.svg"
              alt="github link"
              width="24"
              height="24"
              className={`${css.icon} ${css.contractIcon}`}
            />
          </a>
        </li>
        <li>
          <a href={USER.EMAIL_URL} target="_blank">
            <Image
              src="/images/mail.svg"
              alt="mail link"
              width="24"
              height="24"
              className={`${css.icon} ${css.contractIcon}`}
            />
          </a>
        </li>
        <li>
          <Image
            src={theme === "light" ? "/images/moon.svg" : "/images/sun.svg"}
            alt="toggle dark mode"
            width="24"
            height="24"
            className={css.icon}
            onClick={toggleTheme}
          />
        </li>
      </ul>
    </section>
  );
}
