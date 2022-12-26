import styled from "styled-components";
import Profile from "../modules/Profile";

function InfoSection() {
  return (
    <Container>
      <Profile />
    </Container>
  );
}

const Container = styled.div`
  flex: 0 0 15rem;
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  border: 1px solid black;
`;

export default InfoSection;
