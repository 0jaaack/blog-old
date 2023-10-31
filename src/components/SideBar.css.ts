import { style } from "@vanilla-extract/css";

import { sprinkles } from "../styles/sprinkles.css";
import { s } from "../styles";
import { LIGHT_THEME } from "../constants/theme";

export const layout = style([
  s.flex,
  sprinkles({
    flexDirection: {
      mobile: "row",
      desktop: "column",
    },
    justifyContent: {
      mobile: "space-between",
      desktop: "stretch",
    },
    alignItems: {
      mobile: "center",
      desktop: "flex-start",
    },
    gap: {
      mobile: 0,
      desktop: 4,
    },
    padding: {
      mobile: 0,
      desktop: 5,
    },
    width: {
      mobile: "full",
      desktop: 37,
    },
  }),
]);

export const profile = style([
  sprinkles({
    flexDirection: {
      mobile: "row",
      desktop: "column",
    },
    alignItems: {
      mobile: "center",
      desktop: "stretch",
    },
    gap: {
      mobile: 1,
      desktop: 2,
    },
  }),
  s.flex,
]);

export const profileImage = style([
  sprinkles({
    width: {
      mobile: 8,
      desktop: 10,
    },
    height: {
      mobile: 8,
      desktop: 10,
    },
  }),
  s.rounded,
]);

export const profileName = style([
  sprinkles({
    display: {
      mobile: "none",
      desktop: "inline",
    },
  }),
  {
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#bdc1c6",
  },
]);

export const description = style([
  sprinkles({
    display: {
      mobile: "none",
      desktop: "block",
    },
  }),
  {
    fontSize: "0.8rem",
    color: "grey",
    lineHeight: "1.3rem",
    whiteSpace: "pre-line",
  },
]);

export const underline = style({
  borderBottom: `1px solid ${LIGHT_THEME.FONT}`,
});

export const iconList = style([
  s.flex,
  sprinkles({
    gap: {
      mobile: 0,
      desktop: 3,
    },
  }),
  {
    marginBottom: "-5px",
    listStyle: "none",
  },
]);

export const icon = sprinkles({
  width: {
    mobile: 3,
  },
  height: {
    mobile: 3,
  },
});

export const contractIcon = sprinkles({
  display: {
    mobile: "none",
    desktop: "block",
  },
});
