import BlogInfoSection from "../components/sections/BlogInfoSection";
import PostCollectionSection from "../components/sections/PostCollectionSection";
import Provider from "../components/atoms/Provider";
import MainLayout from "../components/atoms/MainLayout";
import { getPage, getAllPostFileNames } from "../services/postCollectionService";

function Home({ latestPosts, hasNextPage }) {
  return (
    <MainLayout>
      <BlogInfoSection />
      <Provider type="vertical"/>
      <PostCollectionSection
        posts={latestPosts}
        hasPrevPage={false}
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
