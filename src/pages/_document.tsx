import { Html, Head, Main, NextScript } from "next/document";
import { USER } from "../constants";

const ThemeInsertionScript = () => {
  const insertTheme = () => {
    const theme = localStorage.getItem("theme") ?? "dark";
    document.body.classList.add(theme);
  };
  const insertThemeScript = `(${insertTheme.toString()})()`;
  return <script dangerouslySetInnerHTML={{ __html: insertThemeScript }} />;
};

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="shortcut icon"
          href={USER.PROFILE_IMAGE_PATH}
          type="image/x-icon"
        />
        <meta property="og:site_name" content="ponjaehyeok.dev" />
        <meta property="og:title" content="ponjaehyeok.dev" />
        <meta property="og:description" content="ponjaehyeok's dev blog" />
        <meta property="og:image" content={USER.PROFILE_IMAGE_PATH} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="ponjaehyeok.dev" />
        <meta name="twitter:title" content="ponjaehyeok.dev" />
        <meta name="twitter:description" content="ponjaehyeok's dev blog" />
        <meta name="twitter:image" content={USER.PROFILE_IMAGE_PATH} />
      </Head>
      <body>
        <ThemeInsertionScript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
