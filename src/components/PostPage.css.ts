import { style, styleVariants } from "@vanilla-extract/css";

import { s } from "../styles";
import { sprinkles } from "../styles/sprinkles.css";

export const layout = style([
  sprinkles({
    display: {
      mobile: "block",
      desktop: "flex",
    },
    justifyContent: {
      mobile: "stretch",
      desktop: "center",
    },
    height: {
      desktop: "maxHeight",
    },
  }),
  {
    width: "100vw",
    overflowY: "scroll",
    overflowX: "hidden",
    WebkitOverflowScrolling: "touch",
  },
]);

export const sideTab = style([
  sprinkles({
    display: {
      mobile: "none",
      desktop: "block",
    },
  }),
  {
    position: "sticky",
    top: "10rem",
    width: "20rem",
    marginTop: "25rem",
  },
]);

export const postTab = style([
  sprinkles({
    paddingX: {
      mobile: 3,
      desktop: 5,
    },
    paddingY: {
      mobile: 4,
      desktop: 8,
    },
  }),
  {
    position: "relative",
    maxWidth: "40rem",
  },
]);

export const navSection = style([
  s.flex,
  s.justifyContentSpaceBetween,
  s.alignItemsCenter,
  sprinkles({
    marginBottom: {
      mobile: 7,
      desktop: 10,
    },
  }),
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

export const route = style([
  s.link,
  {
    ":hover": {
      textDecoration: "underline",
    },
  },
]);

export const profileImage = style([
  sprinkles({
    width: {
      mobile: 8,
    },
    height: {
      mobile: 8,
    },
  }),
  s.rounded,
  {
    marginBottom: "-5px",
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
      desktop: 6,
    },
  }),
  {
    fontWeight: 700,
    textAlign: "center",
    wordBreak: "keep-all",
  },
]);

export const date = style({
  marginTop: "0.5rem",
  color: "grey",
  fontSize: "0.9rem",
  textAlign: "center",
});

export const tagList = style([
  s.flex,
  s.justifyContentCenter,
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
  paddingBottom: "2rem",
});

export const toc = style({
  fontSize: "0.75rem",
  lineHeight: "1.6rem",
  listStyle: "none",
});

export const highlited = style({
  fontWeight: 500,
});

export const step: Record<string, string> = styleVariants({
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
