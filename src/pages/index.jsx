import styled from "styled-components";
import InfoSection from "../components/sections/InfoSection";
import MainSection from "../components/sections/MainSection";

function Home() {
  return (
    <Container>
      <InfoSection />
      <MainSection />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 0 20vw;
`;

export default Home;
