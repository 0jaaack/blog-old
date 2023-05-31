import { style } from "@vanilla-extract/css";

import { s } from "../styles";
import { sprinkles } from "../styles/sprinkles.css";

export const layout = style([
  s.flex,
  sprinkles({
    flexDirection: {
      mobile: "column",
      desktop: "row",
    },
    justifyContent: {
      mobile: "flex-start",
      desktop: "center",
    },
    paddingX: {
      mobile: 3,
      desktop: 0,
    },
    paddingY: {
      mobile: 4,
      desktop: 5,
    },
    gap: {
      mobile: 5,
      desktop: 0,
    },
  }),
  {
    width: "100vw",
    height: "100vh",
    position: "fixed",
  },
]);

export const provider = style([
  s.fullHeight,
  {
    width: "0.5px",
    backgroundColor: "#808080",
  },
]);

export const tagsLayout = style([
  s.flexColumn,
  sprinkles({
    paddingX: {
      mobile: 0,
      desktop: 5,
    },
    paddingY: {
      mobile: 0,
      desktop: 5,
    },
    width: {
      mobile: "full",
      desktop: 125,
    },
    gap: 5,
  }),
]);

export const sectionTitle = style([
  sprinkles({
    display: {
      mobile: "none",
      desktop: "block",
    },
  }),
  {
    textTransform: "capitalize",
    fontWeight: 700,
    fontSize: "2rem",
  },
]);

export const tagList = style({
  whiteSpace: "pre-line",
  wordBreak: "break-all",
  lineHeight: "2.3rem",
  listStyle: "none",
});

export const tag = style({
  color: "orange",
  fontSize: "0.9rem",
  fontWeight: 500,
  textTransform: "uppercase",
});

export const tagName = style([]);

export const postCount = style({
  marginLeft: "0.4rem",
  marginRight: "1rem",
  color: "#FFFFFF",
});
