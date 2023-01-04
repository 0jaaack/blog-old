import styled from "styled-components";
import useDebounce from "../../hooks/useDebounce";

function TextInput({ size, onChange, ...props }) {
  const handleChange = useDebounce(onChange, 500);

  return (
    <Input
      type="text"
      size={size}
      onChange={handleChange}
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
