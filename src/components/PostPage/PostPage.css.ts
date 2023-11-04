import { style, styleVariants } from "@vanilla-extract/css";

import { s } from "../../styles";
import { sprinkles } from "../../styles/sprinkles.css";
import { mainColor, tertiaryColor } from "../../styles/global.css";
import { pop } from "../CopyIcon/CopyIcon.css";

export const scrollArea = style([
  sprinkles({
    justifyContent: {
      mobile: "stretch",
      desktop: "center",
    },
  }),
  {
    height: "100vh",
    padding: "8rem 0 3rem",
    WebkitOverflowScrolling: "touch",
    overflow: "auto",
  },
]);

export const layout = style([
  sprinkles({
    width: {
      mobile: "full",
      desktop: 87,
    },
    paddingX: {
      mobile: 6,
      desktop: 0,
    },
  }),
  {
    position: "relative",
    margin: "0 auto",
  },
]);

export const sideTabLayout = style([
  sprinkles({
    display: {
      mobile: "none",
      desktop: "block",
    },
  }),
  {
    position: "absolute",
    top: "5rem",
    right: "calc(100% + 1rem)",
    width: "10rem",
  },
]);

export const sideTab = style({
  position: "fixed",
});

export const sideNavigation = style({
  marginBottom: "2rem",
});

export const postTab = style([
  {
    position: "relative",
    display: "flex",
  },
]);

export const navSection = style([
  s.flex,
  s.alignItemsCenter,
  { gap: "0.7rem" },
]);

export const routeLinks = style([
  s.flex,
  s.alignItemsCenter,
  sprinkles({
    gap: {
      mobile: 2,
      desktop: 4,
    },
    fontWeight: {
      mobile: 300,
      desktop: 400,
    },
  }),
  {
    fontSize: "0.9rem",
    textTransform: "capitalize",
    listStyle: "none",
  },
]);

export const profileImage = style([
  sprinkles({
    width: {
      mobile: 3,
    },
    height: {
      mobile: 3,
    },
  }),
  {
    marginBottom: "-4px",
    animation: `${pop} 0.2s ease-out`,
  },
]);

export const colorModeIcon = sprinkles({
  width: {
    mobile: 4,
  },
  height: {
    mobile: 4,
  },
});

export const postInfo = style([
  s.flexColumn,
  s.justifyContentCenter,
  {
    gap: "0.7rem",
  },
]);

export const postTitle = style([
  sprinkles({
    fontSize: {
      mobile: 4,
      desktop: 5,
    },
  }),
  {
    color: mainColor,
    fontWeight: 700,
    wordBreak: "keep-all",
  },
]);

export const date = style({
  marginTop: "0.5rem",
  color: "grey",
  fontSize: "0.9rem",
});

export const tagList = style([
  s.flex,
  {
    gap: "0.4rem",
    padding: 0,
  },
]);

export const tagLabel = style({
  color: "orange",
  fontSize: "0.9rem",
  fontWeight: 500,
  textTransform: "uppercase",
});

export const provider = style({
  height: "0.5px",
  width: "100%",
});

export const postContent = style({
  width: "100%",
  minWidth: "0",
  paddingBottom: "2rem",
});

export const toc = style([
  s.flexColumn,
  {
    gap: "0.5rem",
    width: "10rem",
    color: tertiaryColor,
    fontSize: "14px",
    listStyle: "none",
    wordBreak: "break-all",
  },
]);

export const highlited = style({
  fontWeight: 500,
});

export const header = style({
  display: "inline-block",
  padding: "0 2px",
  lineHeight: "23px",
});

export const step: Record<string, string> = styleVariants({
  "0": {},
  "1": {
    marginLeft: "1rem",
  },
  "2": {
    marginLeft: "2rem",
  },
  "3": {
    marginLeft: "3rem",
  },
});

export const topNavTop = style({
  fontSize: "0.75rem",
  lineHeight: "1.6rem",
});
