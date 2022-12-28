import styled from "styled-components";
import SectionHeader from "../atoms/SectionHeader";
import PostCell from "../modules/PostCell";
import LinkButton from "../atoms/LinkButton";

function PostSection({ posts, hasPrevPage, hasNextPage }) {
  return (
    <PostSectionContainer>
      <SectionHeader>
        latest
      </SectionHeader>
      <PostList>
        {posts.map(({ title, description, tags, date }) => (
          <PostCell
            title={title}
            description={description}
            tags={tags}
            published={date}
          />
        ))}
      </PostList>
      <PagenationConsole>
        {hasPrevPage && (
          <PageLinkButton
            href="/"
            size={9}
            color="blue"
            float="left"
          >
            &larr; Page 0
          </PageLinkButton>
        )}
        {hasNextPage && (
          <PageLinkButton
            href="/"
            size={9}
            color="blue"
            float="right"
          >
            Page 2 &rarr;
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
