import { style } from "@vanilla-extract/css";

import { sprinkles } from "../styles/sprinkles.css";
import { s } from "../styles";

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

export const pageButton = style({
  color: "#D3D3D3",
  fontSize: "0.9rem",
  fontWeight: 500,
  textTransform: "uppercase",
});
