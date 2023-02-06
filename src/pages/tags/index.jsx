import SideBar from "../../main/components/SideBar";
import Tags from "../../tags/components/Tags";
import Provider from "../../shared/components/Provider";
import { getPostTags } from "../../shared/services/post";
import Layout from "../../main/components/Layout";

function TagPage({ tagData }) {
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

export default TagPage;
