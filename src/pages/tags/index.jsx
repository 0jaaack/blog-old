import styled from "styled-components";

import BlogInfoSection from "../../components/sections/BlogInfoSection";
import TagSection from "../../components/sections/TagSection";
import Provider from "../../components/atoms/Provider";

function Tags() {
  return (
    <TagsContainer>
      <BlogInfoSection />
      <Provider type="vertical" />
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
