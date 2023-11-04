import { keyframes, style } from "@vanilla-extract/css";

const pop = keyframes({
  "0%": { transform: "scale(0)" },
  "100%": { transform: "scale(1)" },
});

export const copyIcon = style({
  cursor: "pointer",
  position: "absolute",
  top: "18px",
  right: "18px",
  animation: `${pop} 0.2s ease-out`,
});
