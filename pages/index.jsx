import Head from "next/head";

import MainLayout from "../src/@shared/components/Layout";
import SideBar from "../src/main/components/SideBar";
import Provider from "../src/@shared/components/Provider";
import Main from "../src/main/components/Main";
import { getPage, getAllPostFileNames } from "../src/@shared/services/post";

function HomePage({ latestPosts, hasNextPage }) {
  return (
    <>
      <Head>
        <title>Ponjaehyeok</title>
        <meta name="description" content="ponjaehyeok blog" />
        <link rel="shortcut icon" href="/images/profile.PNG" type="image/x-icon" />
      </Head>
      <MainLayout>
        <SideBar />
        <Provider type="vertical"/>
        <Main
          posts={latestPosts}
          hasNextPage={hasNextPage}
        />
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  try {
    const latestPosts = getPage(1);
    const hasNextPage = getAllPostFileNames().length > 4;

    return {
      props: {
        latestPosts,
        hasNextPage,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export default HomePage;
