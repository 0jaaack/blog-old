import styled from "styled-components";
import InfoSection from "../../components/sections/InfoSection";
import TagSection from "../../components/sections/TagSection";

function Tags() {
  return (
    <TagsContainer>
      <InfoSection />
      <TagSection />
    </TagsContainer>
  );
}

const TagsContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 2rem 15vw;
`;

export default Tags;
