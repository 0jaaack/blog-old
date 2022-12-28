import styled from "styled-components";

import BlogInfoSection from "../components/sections/BlogInfoSection";
import PostSection from "../components/sections/PostSection";
import Provider from "../components/atoms/Provider";
import PostCollection from "../services/postCollection";

export async function getStaticProps() {
  try {
    const posts = new PostCollection();
    const latestPosts = await posts
      .getPage(1)
      .read("title", "description", "tags", "date")
      .getPosts();
    const hasNextPage = false;

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

function Home({ latestPosts, hasNextPage }) {
  return (
    <HomeContainer>
      <BlogInfoSection />
      <Provider type="vertical"/>
      <PostSection
        posts={latestPosts}
        hasPrevPage={false}
        hasNextPage={hasNextPage}
      />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 2rem 15vw;
`;

export default Home;
