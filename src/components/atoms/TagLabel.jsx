import styled from "styled-components";

const TagLabel = styled.span`
  color: ${(({ theme }) => theme.colors.orange)};
  font-size: ${({ size }) => `${size * 0.1}rem`};
  font-weight: 500;
  text-transform: uppercase;
`;

export default TagLabel;
