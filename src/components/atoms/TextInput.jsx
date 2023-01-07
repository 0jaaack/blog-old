import styled from "styled-components";

function TextInput({ size, ...props }) {
  return (
    <Input
      type="text"
      size={size}
      {...props}
    />
  );
}

const Input = styled.input`
  font: inherit;
  font-weight: 700;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.color};
  font-size: ${({ size }) => `${size * 0.1}rem`};
  outline: none;
`;

export default TextInput;
