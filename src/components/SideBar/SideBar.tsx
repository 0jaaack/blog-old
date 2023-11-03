import Image from "next/image";

import { USER } from "../../constants";
import * as css from "./SideBar.css";
import { ThemeToggleIcon } from "../ThemeToggleIcon/ThemeToggleIcon";

export function SideBar() {
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
          <ThemeToggleIcon />
        </li>
      </ul>
    </section>
  );
}
