import styled from "styled-components";

import BlogInfoSection from "../components/sections/BlogInfoSection";
import PostSection from "../components/sections/PostSection";
import Provider from "../components/atoms/Provider";

function Home() {
  return (
    <HomeContainer>
      <BlogInfoSection />
      <Provider type="vertical"/>
      <PostSection />
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
