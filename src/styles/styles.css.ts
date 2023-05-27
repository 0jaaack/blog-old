import { style } from "@vanilla-extract/css";

export const flex = style({
  display: "flex",
});

export const flexColumn = style({
  display: "flex",
  flexDirection: "column",
});

export const justifyContentCenter = style({
  justifyContent: "center",
});

export const justifyContentSpaceBetween = style({
  justifyContent: "space-between",
});

export const alignItemsCenter = style({
  alignItems: "center",
});

export const fullWidth = style({
  width: "100%",
});

export const fullHeight = style({
  height: "100%",
});

export const ellipsis = style({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const rounded = style({
  borderRadius: "50%",
});

export const scroll = style({
  overflow: "scroll",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

export const link = style({
  borderBottom: "none",
  fontSize: "1rem",
  textTransform: "capitalize",
});
