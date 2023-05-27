import { style } from "@vanilla-extract/css";
import { s } from "../styles";

export const layout = style([
  s.flex,
  s.justifyContentCenter,
  {
    width: "100vw",
    height: "100vh",
    padding: "2rem 0",
    position: "fixed",
  },
]);
// @media screen and (max-width: 56rem) {
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 2rem;
//   height: auto;
//   padding: 2.5rem 2rem;
// }

export const provider = style([
  s.fullHeight,
  {
    width: "0.5px",
    backgroundColor: "#808080",
  },
]);

export const sectionTitle = style({
  textTransform: "capitalize",
  fontWeight: 700,
  fontSize: "2rem",
});

export const mainSection = style([
  s.flexColumn,
  {
    width: "50rem",
    padding: "2rem 3rem",
    gap: "3rem",
  },
]);
// @media screen and (max-width: 56rem) {
//   gap: 3rem;
//   width: 100%;
//   padding: 0;
// }

export const postList = style([
  s.flexColumn,
  {
    padding: 0,
    gap: "1.8rem",
  },
]);
//  @media screen and (max-width: 56rem) {
//   gap: 3.4rem;
// }
