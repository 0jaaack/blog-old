import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

const space = {
  0: 0,
  1: "0.4rem",
  2: "0.8rem",
  3: "1.2rem",
  3.5: "1.4rem",
  4: "1.6rem",
  5: "2rem",
  6: "2.4rem",
  7: "2.8rem",
  8: "3.2rem",
  9: "3.6rem",
  10: "4rem",
  11: "4.4rem",
  12: "4.8rem",
  37: "14.8rem",
  75: "30rem",
  87: "34.8rem",
  125: "50rem",
  auto: "auto",
  full: "100%",
  maxHeight: "100vh",
  maxWidth: "100vw",
};

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    desktop: {
      "@media": "screen and (min-width: 1024px)",
    },
  },
  defaultCondition: "mobile",
  properties: {
    display: ["none", "flex", "block", "inline"],
    flexDirection: ["row", "column"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
    ],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    gap: space,
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,
    width: space,
    height: space,
    fontSize: space,
    fontWeight: [100, 300, 400, 500, 700],
    whiteSpace: ["initial", "normal", "nowrap", "pre-wrap"],
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    placeItems: ["justifyContent", "alignItems"],
  },
});

export const sprinkles = createSprinkles(responsiveProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
