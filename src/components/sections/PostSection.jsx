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
        <LinkButton
          href="/"
          size={9}
          color="blue"
        >
          &larr; Page 0
        </LinkButton>
        <LinkButton
          href="/"
          size={9}
          color="blue"
        >
          Page 2 &rarr;
        </LinkButton>
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
  justify-content: space-between;
`;

export default PostSection;
