import { globalStyle } from "@vanilla-extract/css";
import { spoqaHanSansNeo } from "./font.css";

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  font: `300 18px ${spoqaHanSansNeo}, sans-serif`,
  boxSizing: "border-box",
  backgroundColor: "#111827",
  color: "#F2F4F6",
  userSelect: "none",
});

globalStyle("*", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  transition: "all 0.1s ease-out",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});
