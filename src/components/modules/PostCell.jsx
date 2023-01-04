import styled from "styled-components";

import PostTitle from "../atoms/PostTitle";
import Description from "../atoms/Description";
import PostCellDate from "../atoms/PostCellDate";
import TagLabel from "../atoms/TagLabel";
import toSlug from "../../utils/toSlug";

function PostCell({ title, description, tags, published }) {
  return (
    <PostCellContainer>
      <InfoLayout>
        <PostCellDate>
          {published}
        </PostCellDate>
        <TagList>
          {tags.map((tag, idx) => (
            <TagLabel key={tag + idx} size={8}>
              {tag}
            </TagLabel>
          ))}
        </TagList>
      </InfoLayout>
      <HeadLayout>
        <PostTitle
          size={14}
          href={`/${toSlug(title)}`}
        >
          {title}
        </PostTitle>
      </HeadLayout>
      <BodyLayout>
        <PostDescription size={9}>
          {description}
        </PostDescription>
      </BodyLayout>
    </PostCellContainer>
  );
}

const PostCellContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const HeadLayout = styled.div``;

const BodyLayout = styled.div`
  margin: 0.5rem 0;
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
