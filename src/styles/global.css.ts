import { globalStyle, createVar } from "@vanilla-extract/css";
import { spoqaHanSansNeo } from "./font.css";

export const backgroundColor = createVar();
export const mainColor = createVar();
export const secondaryColor = createVar();
export const tertiaryColor = createVar();
export const accentColor = createVar();

globalStyle("body.dark", {
  vars: {
    [backgroundColor]: "#111111",
    [mainColor]: "#F2F4F6",
    [secondaryColor]: "#E5E5E5",
    [tertiaryColor]: "#808080",
    [accentColor]: "#F28646",
  },
});

globalStyle("body.light", {
  vars: {
    [backgroundColor]: "#EAEAEA",
    [mainColor]: "#333333",
    [secondaryColor]: "#555555",
    [tertiaryColor]: "#808080",
    [accentColor]: "#F28646",
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
