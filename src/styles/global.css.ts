import { globalStyle, createVar } from "@vanilla-extract/css";
import { spoqaHanSansNeo } from "./font.css";

export const backgroundColor = createVar();
export const secondBackgroundColor = createVar();
export const mainColor = createVar();
export const secondaryColor = createVar();
export const tertiaryColor = createVar();
export const accentColor = createVar();

export const themeIconSrc = createVar();

globalStyle("body.dark", {
  vars: {
    [backgroundColor]: "#111111",
    [secondBackgroundColor]: "#333333",
    [mainColor]: "#F2F4F6",
    [secondaryColor]: "#E5E5E5",
    [tertiaryColor]: "#B0B0B0",
    [accentColor]: "#F28646",
    [themeIconSrc]: "url('/images/sun.svg')",
  },
});

globalStyle("body.light", {
  vars: {
    [backgroundColor]: "#F2F4F6",
    [secondBackgroundColor]: "#E5E5E5",
    [mainColor]: "#333333",
    [secondaryColor]: "#555555",
    [tertiaryColor]: "#444444",
    [accentColor]: "#F28646",
    [themeIconSrc]: "url('/images/moon.svg')",
  },
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  font: `300 18px ${spoqaHanSansNeo}, sans-serif`,
  boxSizing: "border-box",
  userSelect: "none",
  backgroundColor,
});

globalStyle("*", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  transition: "all 0.1s ease-out",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});
