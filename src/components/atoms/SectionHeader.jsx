import styled from "styled-components";

const SectionHeader = styled.span`
  text-transform: capitalize;
  font-weight: 700;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.lightgrey};
`;

export default SectionHeader;
