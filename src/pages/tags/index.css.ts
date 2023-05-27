import { style } from "@vanilla-extract/css";

import { s } from "../../styles";

export const layout = style([
  s.flex,
  s.justifyContentCenter,
  {
    width: "100vw",
    height: "100vh",
    padding: "2rem 0",
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
  {
    gap: "2rem",
    width: "50rem",
    padding: "2rem 3rem",
  },
]);
/* @media screen and (max-width: 56rem) {
    width: 100%;
    padding: 0;
  } */

export const sectionTitle = style({
  textTransform: "capitalize",
  fontWeight: 700,
  fontSize: "2rem",
});

export const tagList = style({
  whiteSpace: "pre-line",
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
