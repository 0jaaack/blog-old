import { style } from "@vanilla-extract/css";

import { s } from "../../styles";

import type { StyleRule } from "@vanilla-extract/css";
import { mainColor } from "../../styles/global.css";

export const layout = style([
  s.fullHeight,
  {
    position: "relative",
    margin: "3rem 0 1rem",
  },
]);

export const markdown = style([
  s.fullHeight,
  {
    fontSize: "0.85rem",
    lineHeight: "1.5rem",
    userSelect: "text",
    whiteSpace: "pre-wrap",
    color: mainColor,
  },
]);

function markdownStyle(rule: StyleRule): string {
  return style({
    selectors: {
      [`${markdown} &`]: rule,
    },
  });
}

function important(property: string): string {
  return `${property} !important`;
}

export const h1Markdown = markdownStyle({
  margin: "1.8rem 0 0.5rem",
  fontSize: "1.4rem",
});

export const h2Markdown = markdownStyle({
  margin: "1.6rem 0 0.5rem",
  fontSize: "1.2rem",
});

export const h3Markdown = markdownStyle({
  margin: "1.5rem 0 0.5rem",
  fontSize: "1.05rem",
});

export const anchorMarkdown = markdownStyle({
  color: "#5396CD",
  fontWeight: 500,

  ":hover": {
    color: "red",
    fontWeight: 700,
  },
});

export const blockquoteMarkdown = markdownStyle({
  fontStyle: "italic",
  fontSize: "0.9rem",
  color: "#7C848F",
  marginInline: 0,
});

export const preMarkdown = markdownStyle({
  padding: important("1.2rem"),
  backgroundColor: important("#0E1117"),
  borderRadius: important("0.5rem"),
});

export const inlineCodeMarkdown = markdownStyle({
  backgroundColor: important("#0E1117"),
  padding: important("0.2rem 0.4rem"),
  borderRadius: important("0.4rem"),
  lineHeight: important("1.2rem"),
  color: important("#DCDCAA"),
  font: "14px monaco",
});

export const listMarkdown = markdownStyle({
  whiteSpace: "normal",
});

export const liMarkdown = markdownStyle({
  paddingLeft: "0.2rem",
  marginLeft: "1rem",
  marginBottom: "1.5rem",
  whiteSpace: "normal",
});

export const imageMarkdown = markdownStyle({
  width: "100%",
});

export const paragraphMardown = style({
  selectors: {
    [`${liMarkdown} &`]: {
      marginBottom: "0.8rem",
    },
  },
});
