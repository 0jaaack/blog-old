import styled from "styled-components";
import NavButton from "../atoms/NavButton";

function NavBar() {
  const navs = ["posts", "tags", "light mode", "about me"];
  const currentPage = "posts";

  return (
    <Container>
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
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

const NavBarItem = styled.div``

export default NavBar;
