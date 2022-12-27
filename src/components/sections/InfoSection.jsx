import styled from "styled-components";
import Profile from "../modules/Profile";
import NavBar from "../modules/NavBar";

function InfoSection() {
  return (
    <InfoSectionContainer>
      <Profile />
      <NavBar />
    </InfoSectionContainer>
  );
}

const InfoSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 20rem;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
`;

export default InfoSection;