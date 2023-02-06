import GlobalStyles from "../shared/styles/GlobalStyles";
import GlobalFonts from "../shared/styles/GlobalFonts";
import GlobalThemes from "../shared/styles/GlobalThemes";

function App({ Component, pageProps }) {
  return (
    <GlobalThemes>
      <GlobalFonts />
      <GlobalStyles />
      <Component {...pageProps} />
    </GlobalThemes>
  );
}

export default App;
