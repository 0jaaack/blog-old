import Provider from "../shared/components/Provider";
import MainLayout from "../components/atoms/MainLayout";
import { getPage, getAllPostFileNames } from "../services/postCollectionService";

import Main from "../main/components/Main";
import SideBar from "../main/components/SideBar";

function Home({ latestPosts, hasNextPage }) {
  return (
    <MainLayout>
      <SideBar />
      <Provider type="vertical"/>
      <Main
        posts={latestPosts}
        hasNextPage={hasNextPage}
      />
    </MainLayout>
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

export default Home;
