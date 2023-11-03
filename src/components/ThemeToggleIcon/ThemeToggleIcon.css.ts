import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";

export const icon = style([
  sprinkles({
    width: {
      mobile: 3,
    },
    height: {
      mobile: 3,
    },
  }),
  {
    cursor: "pointer",
  },
]);
