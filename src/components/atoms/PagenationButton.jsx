import styled from "styled-components";

function PagenationButton({ children }) {
  return (
    <PageLink>{children}</PageLink>
  );
}

const PageLink = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.blue};
`;

export default PagenationButton;
