import styled from "styled-components";

const Description = styled.p`
  font-size: ${({ size }) => `${size * 0.1}rem`};
  color: ${({ theme }) => theme.colors.grey};
`;

export default Description;
