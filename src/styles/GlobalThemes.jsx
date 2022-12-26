import { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import THEME from "../configs/theme";

const commonTheme = {
  colors: {
    grey: "#888888",
    blue: "#0070F3",
  }
}

const lightModeTheme = {
  background: "#E5E5E5",
  color: "#111111",
};

const darkModeTheme = {
  background: "#111827",
  color: "#F2F4F6",
};

export const ThemeActionContext = createContext();

function GlobalThemes({ children }) {
  const [currentTheme, setCurrentTheme] = useState(THEME.DARK);
  const theme = Object.assign({},
    commonTheme,
    currentTheme === THEME.DARK
      ? darkModeTheme
      : lightModeTheme
  );

  return (
    <ThemeProvider theme={theme}>
      <ThemeActionContext.Provider value={setCurrentTheme}>
        {children}
      </ThemeActionContext.Provider>
    </ThemeProvider>
  );
}

export default GlobalThemes;
