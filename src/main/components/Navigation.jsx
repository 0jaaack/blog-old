import styled from "styled-components";
import LinkButton from "../../@shared/components/LinkButton";
import { useRouter } from "next/router";

function Navigation() {
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
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

export default Navigation;
