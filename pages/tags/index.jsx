import Layout from "../../src/@shared/components/Layout";
import SideBar from "../../src/main/components/SideBar";
import Provider from "../../src/@shared/components/Provider";
import Tags from "../../src/postTag/components/Tags";
import { getPostTags } from "../../src/@shared/services/post";

function TagsPage({ tagData }) {
  return (
    <Layout>
      <SideBar />
      <Provider type="vertical" />
      <Tags
        tags={tagData}
      />
    </Layout>
  );
}

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

export default TagsPage;