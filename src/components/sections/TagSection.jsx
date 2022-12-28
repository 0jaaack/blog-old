import styled from "styled-components";
import SectionHeader from "../atoms/SectionHeader";
import TagLabel from "../atoms/TagLabel";

function TagSection({ tags }) {
  return (
    <TagSectionContainer>
      <SectionHeader>
        Tags
      </SectionHeader>
      <TagList>
        {tags.map(([tagName, postCount]) => (
          <TagCountLabel
            key={tagName}
            size={8}
            count={postCount}
          >{tagName}&nbsp;</TagCountLabel>
        ))}
      </TagList>
    </TagSectionContainer>
  );
}

const TagSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 40rem;
  padding: 1rem 3rem;
`;

const TagList = styled.div`
  white-space: pre-line;
  line-height: 2.3rem;
`;

const TagCountLabel = styled(TagLabel)`
  &::after {
    content: "${({ count }) => count} ";
    margin-left: 0.2rem;
    margin-right: 0.6rem;
    color: ${({ theme }) => theme.color};
  }
`;

export default TagSection;
