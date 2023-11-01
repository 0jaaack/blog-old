import { style } from "@vanilla-extract/css";

import { sprinkles } from "../styles/sprinkles.css";
import { s } from "../styles";
import { accentColor } from "../styles/global.css";

export const pageConsole = style([
  s.flex,
  s.justifyContentSpaceBetween,
  s.alignItemsCenter,
  sprinkles({
    width: {
      mobile: "full",
      desktop: 75,
    },
  }),
]);

export const pageButton = style([
  {
    color: accentColor,
    fontSize: "0.9rem",
    fontWeight: 500,
    textTransform: "uppercase",
  },
]);
