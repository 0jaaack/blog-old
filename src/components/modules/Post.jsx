import styled from "styled-components";

import PostTitle from "../atoms/PostTitle";
import PostDescription from "../atoms/PostDescription";
import PostDateInfo from "../atoms/PostDateInfo";
import PostTag from "../atoms/PostTag";

function Post({ title, description, tags, published }) {
  return (
    <PostContainer>
      <PostInfo>
        <PostDateInfo>
          {published}
        </PostDateInfo>
        <PostTagList>
          {tags.map((tag) => (
            <PostTag>
              {tag}
            </PostTag>
          ))}
        </PostTagList>
      </PostInfo>
      <PostHead>
        <PostTitle>
          {title}
        </PostTitle>
      </PostHead>
      <PostBody>
        <PostDescription>
          {description}
        </PostDescription>
      </PostBody>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PostHead = styled.div``;

const PostBody = styled.div`
  margin: 0.5rem 0;
`;

const PostInfo = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const PostTagList = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default Post;
