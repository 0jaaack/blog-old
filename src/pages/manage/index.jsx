import MainLayout from "../../src/@shared/components/Layout";
import Draftbox from "../../src/draftbox/components/Draftbox";
import { getAllPostFileNames, getPostDetail } from "../../src/@shared/services/post";

function Manage({ posts }) {
  return (
    <MainLayout>
      <Draftbox posts={posts} />
    </MainLayout>
  );
}

export async function getStaticProps() {
  const fileNames = getAllPostFileNames();
  const posts = fileNames.map((post) => getPostDetail(post));

  return {
    props: {
      posts,
    },
  };
}

export default Manage;
