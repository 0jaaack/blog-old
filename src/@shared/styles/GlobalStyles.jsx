import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    padding: 0;
    margin: 0;
    font: 300 18px "Spoqa Han Sans Neo", sans-serif;
    user-select: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }
`

export default GlobalStyles;
