import { Analytics } from "@vercel/analytics/react";

import GlobalStyles from "../src/@shared/styles/GlobalStyles";
import GlobalFonts from "../src/@shared/styles/GlobalFonts";
import GlobalThemes from "../src/@shared/styles/GlobalThemes";

function App({ Component, pageProps }) {
  return (
    <>
      <GlobalThemes>
        <GlobalFonts />
        <GlobalStyles />
        <Component {...pageProps} />
      </GlobalThemes>
      <Analytics />
    </>
  );
}

export default App;
