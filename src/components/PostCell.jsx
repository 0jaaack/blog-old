import styled from "styled-components";

import PostCellDate from "./PostCellDate";
import PostTitle from "./PostTitle";
import toSlug from "../utils/toSlug";

function PostCell({ title, description, tags, published }) {
  return (
    <PostCellContainer>
      <InfoLayout>
        <PostCellDate>{published}</PostCellDate>
        <TagList>
          {tags.map((tag, idx) => (
            <TagLabel key={tag + idx} size={8}>
              {tag}
            </TagLabel>
          ))}
        </TagList>
      </InfoLayout>
      <HeadLayout>
        <PostTitle size={14} href={`/${toSlug(title)}`}>
          {title}
        </PostTitle>
      </HeadLayout>
      <BodyLayout>
        <PostDescription size={9}>{description}</PostDescription>
      </BodyLayout>
    </PostCellContainer>
  );
}

const PostCellContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TagLabel = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  font-size: ${({ size }) => `${size * 0.1}rem`};
  font-weight: 500;
  text-transform: uppercase;
`;

const HeadLayout = styled.div``;

const BodyLayout = styled.div`
  margin: 0.5rem 0;
`;

const Description = styled.p`
  font-size: ${({ size }) => `${size * 0.1}rem`};
  color: ${({ theme }) => theme.colors.grey};
`;

const PostDescription = styled(Description)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InfoLayout = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default PostCell;
