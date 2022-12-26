import { createGlobalStyle } from "styled-components";

const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 100;
    font-style: normal;
    font-display: swap;
    src: local("Spoqa Han Sans Neo"),
      url("/fonts/SpoqaHanSansNeo-Thin.woff2") format("woff2"),
      url("/fonts/SpoqaHanSansNeo-Thin.woff") format("woff");
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 300;
    font-style: normal;
    font-display: swap;
    src: local("Spoqa Han Sans Neo"),
      url("/fonts/SpoqaHanSansNeo-Light.woff2") format("woff2"),
      url("/fonts/SpoqaHanSansNeo-Light.woff") format("woff");
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: local("Spoqa Han Sans Neo"),
      url("/fonts/NotoSans-Regular.woff2") format("woff2"),
      url("/fonts/NotoSans-Regular.woff") format("woff");
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 500;
    font-style: normal;
    font-display: swap;
    src: local("Spoqa Han Sans Neo"),
      url("/fonts/SpoqaHanSansNeo-Medium.woff2") format("woff2"),
      url("/fonts/SpoqaHanSansNeo-Medium.woff") format("woff");
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 700;
    font-style: normal;
    font-display: swap;
    src: local("Spoqa Han Sans Neo"),
      url("/fonts/SpoqaHanSansNeo-Bold.woff2") format("woff2"),
      url("/fonts/SpoqaHanSansNeo-Bold.woff") format("woff");
  }
`;

export default GlobalFonts;
