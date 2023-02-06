import Link from "next/link";
import styled from "styled-components";

const LinkButton = styled(Link)`
  border-bottom: ${({ underlined, theme }) => underlined ? `1px solid ${theme.color}` : "none"};
  color: ${({ color, theme }) => color ? theme.colors[color] : theme.color};
  font-size: ${({ size }) => `${size * 0.1}rem`};
  text-transform: capitalize;
`;

export default LinkButton;
