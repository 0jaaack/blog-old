import styled from "styled-components";
import Profile from "../modules/Profile";
import NavBar from "../modules/NavBar";

function InfoSection() {
  return (
    <Container>
      <Profile />
      <NavBar />
    </Container>
  );
}

const Container = styled.div`
  flex: 0 0 15rem;
  width: 100%;
  height: 100%;
  padding-top: 1rem;
`;

export default InfoSection;
