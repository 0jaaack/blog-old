import { globalFontFace } from "@vanilla-extract/css";

export const spoqaHanSansNeo = "SpoqaHanSansNeo";

globalFontFace(spoqaHanSansNeo, {
  fontWeight: 100,
  fontStyle: "normal",
  fontDisplay: "swap",
  src: `local("Spoqa Han Sans Neo"),
    url("/fonts/SpoqaHanSansNeo-Thin.woff2") format("woff2"),
    url("/fonts/SpoqaHanSansNeo-Thin.woff2") format("woff")`,
});

globalFontFace(spoqaHanSansNeo, {
  fontWeight: 300,
  fontStyle: "normal",
  fontDisplay: "swap",
  src: `local("Spoqa Han Sans Neo"),
    url("/fonts/SpoqaHanSansNeo-Light.woff2") format("woff2"),
    url("/fonts/SpoqaHanSansNeo-Light.woff2") format("woff")`,
});

globalFontFace(spoqaHanSansNeo, {
  fontWeight: 400,
  fontStyle: "normal",
  fontDisplay: "swap",
  src: `local("Spoqa Han Sans Neo"),
    url("/fonts/SpoqaHanSansNeo-Regular.woff2") format("woff2"),
    url("/fonts/SpoqaHanSansNeo-Regular.woff2") format("woff")`,
});

globalFontFace(spoqaHanSansNeo, {
  fontWeight: 500,
  fontStyle: "normal",
  fontDisplay: "swap",
  src: `local("Spoqa Han Sans Neo"),
    url("/fonts/SpoqaHanSansNeo-Medium.woff2") format("woff2"),
    url("/fonts/SpoqaHanSansNeo-Medium.woff2") format("woff")`,
});

globalFontFace(spoqaHanSansNeo, {
  fontWeight: 700,
  fontStyle: "normal",
  fontDisplay: "swap",
  src: `local("Spoqa Han Sans Neo"),
    url("/fonts/SpoqaHanSansNeo-Bold.woff2") format("woff2"),
    url("/fonts/SpoqaHanSansNeo-Bold.woff2") format("woff")`,
});
