import { style } from "@vanilla-extract/css";

import { s } from "../styles";
import { LIGHT_THEME } from "../constants/theme";

export const layout = style([
  s.flexColumn,
  {
    gap: "3rem",
    width: "15rem",
    padding: "2rem",
  },
]);
// @media screen and (max-width: 56rem) {
//   flex-direction: row;
//   align-items: center;
//   padding: 0;
//   gap: 1.5rem;
// }

export const profile = style([s.flexColumn, { gap: "1rem" }]);
// @media screen and (max-width: 56rem) {
//   flex-direction: row;
//   align-items: center;
//   gap: 0.2rem;
// }

export const profileImage = style([s.rounded]);
// @media screen and (max-width: 56rem) {
//   width: 2.5rem;
//   height: 2.5rem;
// }

export const profileName = style({
  fontWeight: 500,
  fontSize: "0.9rem",
});
// @media screen and (max-width: 56rem) {
//   font-weight: 700;
//   font-size: 1.2rem;
// }

export const description = style({
  fontSize: "0.8rem",
  color: "grey",
  lineHeight: "1.3rem",
  whiteSpace: "pre-line",
});
/* @media screen and (max-width: 56rem) {
    display: none;
  } */

export const navBar = style([s.flexColumn, { gap: "0.9rem" }]);
// @media screen and (max-width: 56rem) {
//   flex-direction: row;
// }

export const navLink = style([s.link]);

export const underline = style({
  borderBottom: `1px solid ${LIGHT_THEME.FONT}`,
});

export const iconList = style([
  s.flex,
  {
    gap: "1.5rem",
    listStyle: "none",
  },
]);

export const icon = style({
  color: "red",
  fill: "currentcolor",
  ":hover": {
    color: "blue",
  },
});
