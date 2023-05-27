import { style } from "@vanilla-extract/css";

import { s } from "../styles";

export const pageConsole = style([
  s.flex,
  s.justifyContentSpaceBetween,
  s.alignItemsCenter,
  {
    width: "30rem",
  },
]);

export const pageButton = style([
  {
    color: "#D3D3D3",
    fontWeight: 500,
    fontSize: "0.9rem",
    textTransform: "uppercase",
  },
]);
