import { Html, Head, Main, NextScript } from "next/document";
import { USER } from "../constants/user";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="shortcut icon"
          href={USER.PROFILE_IMAGE_PATH}
          type="image/x-icon"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
