import Head from "next/head";

import MainLayout from "../@shared/components/Layout";
import SideBar from "../main/components/SideBar";
import Provider from "../@shared/components/Provider";
import Main from "../main/components/Main";
import { getPage, getAllPostFileNames } from "../@shared/services/post";

function HomePage({ latestPosts, hasNextPage }) {
  return (
    <>
      <Head>
        <title>ponjaehyeok blog</title>
        <meta name="description" content="ponjaehyeok blog" />
        <link
          rel="shortcut icon"
          href="/images/profile.PNG"
          type="image/x-icon"
        />
      </Head>
      <MainLayout>
        <SideBar />
        <Provider type="vertical" />
        <Main posts={latestPosts} hasNextPage={hasNextPage} />
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
