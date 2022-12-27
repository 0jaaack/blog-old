import styled from "styled-components";
import NavButton from "../atoms/NavButton";

function NavBar() {
  const navs = ["posts", "tags", "light mode", "about me"];
  const currentPage = "posts";

  return (
    <NavBarContainer>
      {navs.map((nav) => (
        <NavBarItem
          key={nav}
        >
          <NavButton
            page={nav}
            isCurrentPage={nav === currentPage}
          />
        </NavBarItem>
      ))}
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

const NavBarItem = styled.div``

export default NavBar;
