import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};

function GlobalThemes({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

export default GlobalThemes;
