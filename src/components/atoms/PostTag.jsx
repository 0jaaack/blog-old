import styled from "styled-components";

const PostTag = styled.span`
  color: ${(({ theme }) => theme.colors.orange)};
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
`;

export default PostTag;
