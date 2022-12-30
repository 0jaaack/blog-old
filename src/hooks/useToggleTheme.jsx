import { useCallback, useContext } from "react";
import { ThemeActionContext } from "../styles/GlobalThemes";
import THEME from "../configs/theme";

function useToggleTheme() {
  const setTheme = useContext(ThemeActionContext);

  return useCallback(() => {
    setTheme(prevTheme => prevTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK);
  }, [setTheme]);
}

export default useToggleTheme;
