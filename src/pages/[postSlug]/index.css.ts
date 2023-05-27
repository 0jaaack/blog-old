import { style } from "@vanilla-extract/css";

import { s } from "../../styles";

export const layout = style({
  position: "relative",
  maxWidth: "40rem",
  padding: "3rem 2rem",
});

export const navSection = style([
  s.flex,
  s.justifyContentSpaceBetween,
  s.alignItemsCenter,
  {
    marginBottom: "4rem",
  },
]);

export const routeLinks = style([
  s.flex,
  s.alignItemsCenter,
  {
    gap: "1.5rem",
    fontSize: "0.9rem",
    fontWeight: 400,
    textTransform: "capitalize",
    listStyle: "none",
  },
]);

export const route = style({
  lineHeight: "2rem",
  ":hover": {
    textDecoration: "underline",
  },
});

export const profileImage = style([s.rounded]);

export const postInfo = style([
  s.flexColumn,
  s.justifyContentCenter,
  {
    gap: "0.7rem",
  },
]);

export const postTitle = style({
  fontWeight: 700,
  fontSize: "2.3rem",
  textAlign: "center",
  wordBreak: "keep-all",
});

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

export const postContent = style({});

export const postNav = style({
  position: "fixed",
  top: 0,
  right: "12rem",
  width: "20rem",
  marginTop: "20rem",
});

export const toc = style({
  fontSize: "0.75rem",
  lineHeight: "1.6rem",
  listStyle: "none",
});

export const aa = style([
  s.flex,
  s.justifyContentCenter,
  s.fullWidth,
  {
    height: "100rem",
    overflow: "visible",
  },
]);
