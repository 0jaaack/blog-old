import styled from "styled-components";
import InfoSection from "../components/sections/InfoSection";
import PostSection from "../components/sections/PostSection";

function Home() {
  return (
    <HomeContainer>
      <InfoSection />
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
