import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../styles/sprinkles.css";
import { pop } from "../CopyIcon/CopyIcon.css";
import { themeIconSrc } from "../../styles/global.css";

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
    animation: `${pop} 0.2s ease-out`,
    backgroundImage: themeIconSrc,
    backgroundSize: "cover",
  },
]);
