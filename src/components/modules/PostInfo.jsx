import styled from "styled-components";
import TagLabel from "../atoms/TagLabel";
import PostTitle from "../atoms/PostTitle";
import Description from "../atoms/Description";

function PostInfo({ title, published, tags }) {
  return (
    <PostInfoContainer>
      <Description size={9}>
        {published}
      </Description>
      <PostTitle size={25}>
        {title}
      </PostTitle>
      <TagList>
        {tags.map((tag) => (
          <TagLabel size={10}>
            {tag}
          </TagLabel>
        ))}
      </TagList>
    </PostInfoContainer>
  );
}

const PostInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.3rem;
`;

const TagList = styled.span`
  display: inline-flex;
  gap: 0.4rem;
  line-height: 3rem;
`;

export default PostInfo;
