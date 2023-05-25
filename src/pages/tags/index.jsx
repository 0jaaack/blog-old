import Head from "next/head";

import Layout from "../../@shared/components/Layout";
import SideBar from "../../main/components/SideBar";
import Provider from "../../@shared/components/Provider";
import Tags from "../../postTag/components/Tags";
import { getPostTags } from "../../@shared/services/post";

function TagsPage({ tagData }) {
  return (
    <>
      <Head>
        <title>ponjaehyeok blog</title>
        <link
          rel="shortcut icon"
          href="/images/profile.PNG"
          type="image/x-icon"
        />
      </Head>
      <Layout>
        <SideBar />
        <Provider type="vertical" />
        <Tags tags={tagData} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  try {
    const tagData = getPostTags();

    return {
      props: {
        tagData,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export default TagsPage;
