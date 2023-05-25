import styled from "styled-components";
import Profile from "./Profile";
import Navigation from "./Navigation";

function SideBar() {
  return (
    <SideBarContainer>
      <Profile />
      <Navigation />
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 16rem;
  padding: 2rem;

  @media screen and (max-width: 56rem) {
    flex-direction: row;
    align-items: center;
    padding: 0;
    gap: 1.5rem;
  }
`;

export default SideBar;
