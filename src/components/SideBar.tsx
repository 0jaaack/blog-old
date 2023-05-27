import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { USER } from "../constants/user";
import * as css from "./SideBar.css";

export const NAVIGATION_ROUTES = [
  {
    page: "posts",
    href: "/",
    path: ["", "pages"],
  },
  {
    page: "tags",
    href: "/tags",
    path: ["tags"],
  },
];

export function SideBar() {
  const { pathname } = useRouter();
  const currentPath = pathname.split("/")[1];

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

      <div className={css.navBar}>
        {NAVIGATION_ROUTES.map((route) => (
          <div key={route.page}>
            <Link
              href={route.href}
              className={`${css.navLink} ${
                route.path.some((path) => path === currentPath)
                  ? css.underline
                  : ""
              }`}
            >
              {route.page}
            </Link>
          </div>
        ))}
      </div>

      <ul className={css.iconList}>
        <li>
          <a href={USER.GITHUB_URL} target="_blank">
            <Image
              src="/images/github.svg"
              alt="github link"
              width="24"
              height="24"
              className={css.icon}
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
              className={css.icon}
            />
          </a>
        </li>
        <li>
          <Image
            src="/images/sun.svg"
            alt="toggle dark mode"
            width="24"
            height="24"
            className={css.icon}
          />
        </li>
      </ul>
    </section>
  );
}
