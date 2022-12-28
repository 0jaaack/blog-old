import styled from "styled-components";
import LinkButton from "../atoms/LinkButton";
import { useRouter } from "next/router";

function NavBar() {
  const { pathname } = useRouter();
  const currentPath = pathname.split("/")[1];
  const navPages = [
    {
      page: "posts",
      href: "/",
      path: ["", "pages"],
    },
    {
      page: "tags",
      href: "/tags",
      path: ["tags"],
    }
  ];

  return (
    <NavBarContainer>
      {navPages.map((nav) => (
        <div key={nav.page}>
          <LinkButton
            href={nav.href}
            size={10}
            underlined={nav.path.some((path) => path === currentPath) ? "true" : undefined}
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
