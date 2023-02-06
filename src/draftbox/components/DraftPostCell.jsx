import styled from "styled-components";
import Button from "../../@shared/components/Button";
import Link from "next/link";

import toSlug from "../../@shared/utils/toSlug";

function DraftPostCell({ post }) {
  return (
    <DraftPostCellContainer>
      <DraftPostCellHeader>
        <Description size={8}>{post.date}</Description>
        <PageLink
          href={`/${toSlug(post.title)}`}
          highlight={post.published}
        >
          {post.title}
        </PageLink>
      </DraftPostCellHeader>
      <Button size={9}>
        <Link href={`/edit/${toSlug(post.title)}`}>수정</Link>
      </Button>
    </DraftPostCellContainer>
  );
}

const DraftPostCellContainer = styled.li`
  display: flex;
  justify-content: space-between;
  height: 3rem;
  line-height: 3rem;
  list-style-type: none;
`;

const DraftPostCellHeader = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const Description = styled.p`
  font-size: ${({ size }) => `${size * 0.1}rem`};
  color: ${({ theme }) => theme.colors.grey};
`;

const PageLink = styled(Link)`
  color: ${({ highlight, theme }) => highlight ? theme.colors : theme.colors.grey};
`;

export default DraftPostCell;
