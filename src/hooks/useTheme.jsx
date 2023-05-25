import { useCallback, useContext } from "react";
import THEME from "../constants/theme";
import { ThemeActionContext } from "../styles/GlobalThemes";

function useToggleTheme() {
  const setTheme = useContext(ThemeActionContext);

  return useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK
    );
  }, [setTheme]);
}

export default useToggleTheme;
