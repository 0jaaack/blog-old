import { useRouter } from "next/router";
import styled from "styled-components";

import SectionHeader from "../atoms/SectionHeader";
import PostCell from "../modules/PostCell";
import PagenationConsole from "../modules/PagenationConsole";

function PostSection({ posts, hasPrevPage, hasNextPage }) {
  const { query: { pageIndex } } = useRouter();

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
      <PagenationConsole
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
      />
    </PostSectionContainer>
  );
}

const PostSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 40vw;
  padding: 2rem 3rem;
`;

const PostList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3rem 0;
`;

export default PostSection;
