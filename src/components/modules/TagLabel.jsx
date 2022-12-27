import styled from "styled-components";
import TagLabelName from "../atoms/TagLabelName";
import TagLabelCount from "../atoms/TagLabelCount";

function TagLabel({ name, posts }) {
  return (
    <TagLabelContainer>
      <TagLabelName>{name}</TagLabelName>
      <TagLabelCount>{posts} </TagLabelCount>
    </TagLabelContainer>
  );
}

const TagLabelContainer = styled.span`
  display: inline-flex;
  gap: 0.4rem;
  margin-right: 0.6rem;
`;

export default TagLabel;
