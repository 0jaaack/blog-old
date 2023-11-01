export type Mode = "auto" | "development" | "production";
export type Theme = "light" | "dark";

export const CONFIG = {
  MODE: process.env.NEXT_PUBLIC_MODE as Mode,
};

export const DEFAULT_THEME: Theme = "dark";

export const POST = {
  DEFAULT_NUMBER_OF_POSTS: 4,
};

export const USER = {
  NAME: "gongjaack",
  DESCRIPTION:
    "최대한 깊게 개념을 탐구해보고\r\n기록하기 위한 블로그\r\n\r\n파고 또 파고..",
  PROFILE_IMAGE_PATH: "/images/profile.PNG",
  GITHUB_URL: "https://github.com/gongjaack",
  EMAIL_URL: "mailto:ruud091@gmail.com",
};
