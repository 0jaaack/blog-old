import GlobalStyles from "../styles/GlobalStyles";
import GlobalFonts from "../styles/GlobalFonts";
import GlobalThemes from "../styles/GlobalThemes";

export default function App({ Component, pageProps }) {
  return (
    <GlobalThemes>
      <GlobalFonts />
      <GlobalStyles />
      <Component {...pageProps} />
    </GlobalThemes>
  );
}
