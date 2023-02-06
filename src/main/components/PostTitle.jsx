import Link from "next/link";
import styled from "styled-components";

function PostTitle({ children, href, size }) {
  if (!href) {
    return (
      <PostTextTitle size={size}>
        {children}
      </PostTextTitle>
    );
  }

  return (
    <PostLinkTitle
      href={href}
      size={size}
    >
      {children}
    </PostLinkTitle>
  );
}

const PostTextTitle = styled.p`
  font-weight: 700;
  font-size: ${({ size }) => `${size * 0.1}rem`};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PostLinkTitle = styled(Link)`
  font-weight: 700;
  font-size: ${({ size }) => `${size * 0.1}rem`};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default PostTitle;
