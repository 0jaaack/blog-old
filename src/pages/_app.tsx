import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

import { CONFIG } from "../constants";

import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ponjaehyeok.dev</title>
      </Head>
      <Component {...pageProps} />
      <Analytics mode={CONFIG.MODE ?? "development"} />
    </>
  );
}

export default App;
