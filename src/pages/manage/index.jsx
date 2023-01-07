import MainLayout from "../../components/atoms/MainLayout";
import PostManageSection from "../../components/sections/PostManageSection";
import { getAllPostFileNames, getPostDetail } from "../../services/postCollectionService";

function Manage({ posts }) {
  return (
    <MainLayout>
      <PostManageSection
        posts={posts}
      />
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
