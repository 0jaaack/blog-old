import { useRouter } from "next/router";
import styled from "styled-components";

import SectionHeader from "../atoms/SectionHeader";
import PostCell from "../modules/PostCell";
import LinkButton from "../atoms/LinkButton";

function PostSection({ posts, hasPrevPage, hasNextPage }) {
  const { query: { pageIndex } } = useRouter();
  const currentIndex = pageIndex ?? "1";

  return (
    <PostSectionContainer>
      <SectionHeader>
        {pageIndex ? `page ${pageIndex}` : "latest"}
      </SectionHeader>
      <PostList>
        {posts.map(({ title, description, tags, date }) => (
          <PostCell
            title={title}
            description={description}
            tags={tags}
            published={date}
            key={title}
          />
        ))}
      </PostList>
      <PagenationConsole>
        {hasPrevPage && (
          <PageLinkButton
            href={`/pages/${Number(currentIndex) - 1}`}
            size={9}
            color="blue"
            float="left"
          >
            &larr; Page {Number(currentIndex) - 1}
          </PageLinkButton>
        )}
        {hasNextPage && (
          <PageLinkButton
            href={`/pages/${Number(currentIndex) + 1}`}
            size={9}
            color="blue"
            float="right"
          >
            Page {Number(currentIndex) + 1} &rarr;
          </PageLinkButton>
        )}
      </PagenationConsole>
    </PostSectionContainer>
  );
}

const PostSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 40rem;
  padding: 1rem 3rem;
`;

const PostList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2.5rem 0;
`;

const PagenationConsole = styled.div`
  display: flex;
`;

const PageLinkButton = styled(LinkButton)`
  margin-left: ${({ float }) => float === "right" ? "auto" : 0};
  margin-right: ${({ float }) => float === "left" ? "auto" : 0};
`;

export default PostSection;
