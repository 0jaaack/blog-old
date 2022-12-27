import styled from "styled-components";

import PostTitle from "../atoms/PostTitle";
import PostDescription from "../atoms/PostDescription";
import PostDateInfo from "../atoms/PostDateInfo";
import PostTag from "../atoms/PostTag";

function Post({ title, description, tags, published }) {
  return (
    <PostContainer>
      <InfoLayout>
        <PostDateInfo>
          {published}
        </PostDateInfo>
        <TagList>
          {tags.map((tag) => (
            <PostTag>
              {tag}
            </PostTag>
          ))}
        </TagList>
      </InfoLayout>
      <HeadLayout>
        <PostTitle>
          {title}
        </PostTitle>
      </HeadLayout>
      <BodyLayout>
        <PostDescription>
          {description}
        </PostDescription>
      </BodyLayout>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const HeadLayout = styled.div``;

const BodyLayout = styled.div`
  margin: 0.5rem 0;
`;

const InfoLayout = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default Post;
