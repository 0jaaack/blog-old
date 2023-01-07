import styled from "styled-components";
import Button from "../atoms/Button";
import Link from "next/link";

import toSlug from "../../utils/toSlug";
import Description from "../atoms/Description";

function PostManageCell({ post }) {
  return (
    <PostManageCellContainer>
      <PostManageCellHeader>
        <Description size={8}>{post.date}</Description>
        <PageLink
          href={`/${toSlug(post.title)}`}
          highlight={post.published}
        >
          {post.title}
        </PageLink>
      </PostManageCellHeader>
      <Button size={9}>
        <Link href={`/edit/${toSlug(post.title)}`}>수정</Link>
      </Button>
    </PostManageCellContainer>
  );
}

const PostManageCellContainer = styled.li`
  display: flex;
  justify-content: space-between;
  height: 3rem;
  line-height: 3rem;
  list-style-type: none;
`;

const PostManageCellHeader = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PageLink = styled(Link)`
  color: ${({ highlight, theme }) => highlight ? theme.colors : theme.colors.grey};
`;

export default PostManageCell;
