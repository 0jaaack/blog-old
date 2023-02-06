import styled from "styled-components";

const Provider = styled.div`
  width: ${({ type }) => type === "vertical" ? "0.5px" : "100%"};
  height: ${({ type }) => type === "horizon" ?  "0.5px" : "100%"};
  background: ${({ theme }) => theme.colors.grey};
`;

export default Provider;
