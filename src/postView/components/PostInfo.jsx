import styled from "styled-components";
import TagLabel from "../../@shared/components/TagLabel";

function PostInfo({ title, published, tags = [] }) {
  return (
    <PostInfoContainer>
      <PostTitle size={18}>
        {title}
      </PostTitle>
      <Description size={8}>
        {published}
      </Description>
      <TagList>
        {tags.map((tag) => (
          <TagLabel key={tag} size={8}>
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

const PostTitle = styled.p`
  font-weight: 700;
  font-size: ${({ size }) => `${size * 0.1}rem`};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  font-size: ${({ size }) => `${size * 0.1}rem`};
  color: ${({ theme }) => theme.colors.grey};
`;

export default PostInfo;
