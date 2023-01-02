import styled from "styled-components";
import TagLabel from "../atoms/TagLabel";
import PostTitle from "../atoms/PostTitle";
import Description from "../atoms/Description";

function PostInfo({ title, published, tags = [] }) {
  return (
    <PostInfoContainer>
      <PostTitle size={25}>
        {title}
      </PostTitle>
      <Description size={9}>
        {published}
      </Description>
      <TagList>
        {tags.map((tag) => (
          <TagLabel key={tag} size={10}>
            {tag}
          </TagLabel>
        ))}
      </TagList>
    </PostInfoContainer>
  );
}

const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  height: 10rem;
`;

const TagList = styled.span`
  display: inline-flex;
  gap: 0.4rem;
  margin-top: 1rem;
  padding: 0;
`;

export default PostInfo;
