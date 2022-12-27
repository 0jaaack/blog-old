import styled from "styled-components";

const PostTitle = styled.p`
  font-weight: 700;
  font-size: ${({ size }) => `${size * 0.1}rem`};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default PostTitle;
