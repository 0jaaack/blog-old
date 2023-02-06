import { useRouter } from "next/router";
import styled from "styled-components";

import PostCell from "./PostCell";
import PageConsole from "./PageConsole";

function Main({ posts, hasPrevPage, hasNextPage }) {
  const { query: { pageIndex } } = useRouter();

  return (
    <MainContainer>
      <MainHeader>
        {pageIndex ? `page ${pageIndex}` : "latest"}
      </MainHeader>
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
      <PageConsole
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
      />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 40vw;
  padding: 1rem 3rem;
`;

const MainHeader = styled.span`
  text-transform: capitalize;
  font-weight: 700;
  font-size: ${({ size }) => size ? `${size * 0.1}rem` : "1.8rem"};
  color: ${({ theme }) => theme.colors.lightgrey};
`;

const PostList = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2.3rem;
`;

export default Main;
