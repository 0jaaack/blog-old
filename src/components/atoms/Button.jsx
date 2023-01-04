import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border: 0;
  font: inherit;
  font-size: ${({ size }) => size ? `${size * 0.1}rem` : "1.1rem"};
  color: ${({ theme }) => theme.colors.grey};
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.color};
  }
`;

export default Button;
