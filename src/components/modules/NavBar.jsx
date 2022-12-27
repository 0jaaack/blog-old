import styled from "styled-components";
import LinkButton from "../atoms/LinkButton";

function NavBar() {
  const navs = ["posts", "tags", "light mode", "about me"];
  const currentPage = "posts";

  return (
    <NavBarContainer>
      {navs.map((nav) => (
        <NavBarItem
          key={nav}
        >
          <LinkButton
            href={"/"}
            size={9}
            underlined={nav === currentPage}
          >
            {nav}
          </LinkButton>
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
