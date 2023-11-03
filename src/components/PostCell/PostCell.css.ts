import { style } from "@vanilla-extract/css";
import { s } from "../../styles";
import { sprinkles } from "../../styles/sprinkles.css";
import {
  accentColor,
  mainColor,
  secondaryColor,
  tertiaryColor,
} from "../../styles/global.css";

export const layout = style([
  s.flexColumn,
  {
    gap: "0.5rem",
  },
]);

export const tagLabel = style({
  color: accentColor,
  fontSize: "0.8rem",
  fontWeight: 500,
  textTransform: "uppercase",
});

export const postDate = style([
  {
    color: secondaryColor,
    fontSize: "0.8rem",
    fontWeight: 500,
  },
]);

export const postTitle = style([
  sprinkles({
    fontSize: {
      mobile: 3,
      desktop: 3.5,
    },
    whiteSpace: {
      mobile: "normal",
      desktop: "nowrap",
    },
  }),
  {
    color: mainColor,
    fontWeight: 700,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
]);

export const bodyLayout = style({
  margin: "0.3rem 0 0.7rem",
});

export const description = style({
  fontSize: "0.9rem",
  color: tertiaryColor,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const infoLayout = style([
  s.flex,
  {
    gap: "0.7rem",
  },
]);

export const tagList = style([
  s.flex,
  {
    gap: "0.5rem",
    listStyle: "none",
  },
]);
