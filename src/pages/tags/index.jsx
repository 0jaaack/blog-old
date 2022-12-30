import styled from "styled-components";

import BlogInfoSection from "../../components/sections/BlogInfoSection";
import TagSection from "../../components/sections/TagSection";
import Provider from "../../components/atoms/Provider";
import { getPostTags } from "../../services/postService";
import MainLayout from "../../components/atoms/MainLayout";

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
    <MainLayout>
      <BlogInfoSection />
      <Provider type="vertical" />
      <TagSection
        tags={tagData}
      />
    </MainLayout>
  );
}

export default Tags;
