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
`;

export default SideBar;
