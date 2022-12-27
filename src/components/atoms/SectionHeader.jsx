import styled from "styled-components";

const SectionHeader = styled.span`
  text-transform: capitalize;
  font-weight: 700;
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.grey};
`;

export default SectionHeader;
