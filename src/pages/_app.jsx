import { Analytics } from "@vercel/analytics/react";

import { CONFIG } from "../constants/config";
import { s } from "../styles";

function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics mode={CONFIG.MODE} />
    </>
  );
}

export default App;
