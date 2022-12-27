import styled from "styled-components";
import LinkButton from "../atoms/LinkButton";
import { useRouter } from "next/router";

function NavBar() {
  const { pathname } = useRouter();
  const navPages = [
    {
      page: "posts",
      path: "/",
    },
    {
      page: "tags",
      path: "/tags",
    }
  ];

  return (
    <NavBarContainer>
      {navPages.map((nav) => (
        <div key={nav.page}>
          <LinkButton
            href={nav.path}
            size={10}
            underlined={pathname === nav.path}
          >
            {nav.page}
          </LinkButton>
        </div>
      ))}
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

export default NavBar;
