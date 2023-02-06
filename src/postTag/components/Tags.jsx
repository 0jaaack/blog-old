import styled from "styled-components";
import SectionHeader from "../../@shared/components/SectionHeader";

function Tags({ tags }) {
  return (
    <TagsContainer>
      <SectionHeader>
        Tags
      </SectionHeader>
      <TagList>
        {tags.map(([tagName, postCount]) => (
          <TagLabel
            key={tagName}
            size={8}
            count={postCount}
          >
            {tagName}&nbsp;
          </TagLabel>
        ))}
      </TagList>
    </TagsContainer>
  );
}

const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 40vw;
  padding: 2rem 3rem;
`;

const TagList = styled.div`
  white-space: pre-line;
  line-height: 2.3rem;
`;

const TagLabel = styled.span`
  color: ${(({ theme }) => theme.colors.orange)};
  font-size: ${({ size }) => `${size * 0.1}rem`};
  font-weight: 500;
  text-transform: uppercase;

  &::after {
    content: "${({ count }) => count} ";
    margin-left: 0.2rem;
    margin-right: 0.6rem;
    color: ${({ theme }) => theme.color};
  }
`;

export default Tags;
