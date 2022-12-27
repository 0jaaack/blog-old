import styled from "styled-components";

const PostDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.grey};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default PostDescription;
