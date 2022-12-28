import styled from "styled-components";

import BlogInfoSection from "../../components/sections/BlogInfoSection";
import TagSection from "../../components/sections/TagSection";
import Provider from "../../components/atoms/Provider";
import { getPostTags } from "../../services/postService";

export async function getStaticProps() {
  try {
    const tagData = getPostTags();

    return {
      props: {
        tagData
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

function Tags({ tagData }) {
  return (
    <TagsContainer>
      <BlogInfoSection />
      <Provider type="vertical" />
      <TagSection
        tags={tagData}
      />
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
