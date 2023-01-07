import { useState } from "react";

import ConfirmPasswored from "../../components/sections/ConfirmPassword";
import MainLayout from "../../components/atoms/MainLayout";
import PostManageSection from "../../components/sections/PostManageSection";
import { getAllPostFileNames, getPostDetail } from "../../services/postCollectionService";

function Manage({ posts }) {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
      {authenticated ? (
        <MainLayout>
          <PostManageSection posts={posts} />
        </MainLayout>
      ) : (
        <ConfirmPasswored
          onConfirm={() => setAuthenticated(true)}
        />
      )}
    </>
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
