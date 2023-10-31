import { style } from "@vanilla-extract/css";

import { sprinkles } from "../styles/sprinkles.css";
import { s } from "../styles";

export const layout = style([
  s.flex,
  sprinkles({
    flexDirection: {
      mobile: "column",
      desktop: "row",
    },
    justifyContent: {
      desktop: "center",
    },
    gap: {
      mobile: 8,
      desktop: 0,
    },
    width: "maxWidth",
    height: {
      desktop: "maxHeight",
    },
    paddingX: {
      mobile: 3,
      desktop: 0,
    },
    paddingY: {
      mobile: 4,
      desktop: 5,
    },
  }),
]);

export const provider = style([
  s.fullHeight,
  {
    width: "0.5px",
    backgroundColor: "#808080",
  },
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

export const mainSection = style([
  s.flexColumn,
  sprinkles({
    width: {
      mobile: "full",
      desktop: 125,
    },
    height: {
      desktop: "full",
    },
    justifyContent: {
      mobile: "flex-start",
      desktop: "space-between",
    },
    paddingX: {
      mobile: 0,
      desktop: 5,
    },
    paddingY: {
      mobile: 0,
      desktop: 5,
    },
    marginBottom: {
      mobile: 5,
      desktop: 0,
    },
    gap: {
      mobile: 5,
      desktop: 5,
    },
  }),
]);

export const postList = style([
  sprinkles({
    gap: {
      mobile: 5,
      desktop: 4,
    },
  }),
  s.flexColumn,
  {
    height: "100%",
    padding: 0,
  },
]);
