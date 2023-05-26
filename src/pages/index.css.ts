import { style } from "@vanilla-extract/css";
import { s } from "../styles";

export const laylout = style([
  s.flex,
  s.justifyContentCenter,
  {
    width: "100vw",
    height: "100vh",
    padding: "5rem 0",
  },
]);

// @media screen and (max-width: 56rem) {
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 2rem;
//   height: auto;
//   padding: 2.5rem 2rem;
// }

export const sideBar = style([
  s.flexColumn,
  {
    gap: "2rem",
    width: "16rem",
    padding: "2rem",
  },
]);

// @media screen and (max-width: 56rem) {
//   flex-direction: row;
//   align-items: center;
//   padding: 0;
//   gap: 1.5rem;
// }

export const provider = style([
  s.fullHeight,
  {
    width: "0.5px",
    backgroundColor: "#999999",
  },
]);

export const sectionTitle = style([
  {
    textTransform: "capitalize",
    fontWeight: 700,
    fontSize: "2rem",
  },
]);

export const mainSection = style([
  s.flexColumn,
  {
    gap: "3rem",
    width: "50rem",
    padding: "1rem 3rem",
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
    gap: "2.3rem",
  },
]);

//  @media screen and (max-width: 56rem) {
//   gap: 3.4rem;
// }

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

export const pageIndex = style([
  {
    fontSize: "0.9rem",
  },
]);
