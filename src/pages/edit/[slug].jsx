import { useState } from "react";
import ConfirmPasswored from "../../components/sections/ConfirmPassword";
import PostWritingSection from "../../components/sections/PostWritingSection";
import { getPost, getAllPostFileNames } from "../../services/postCollectionService";

function Edit({ post }) {
  const [authenticated, setAuthenticated] = useState(false);
  const postData = {
    ...post,
    tags: post.tags.map((tag) => "#" + tag).join(" "),
  };

  return (
    <>
      {authenticated ? (
        <PostWritingSection post={postData} />
      ) : (
        <ConfirmPasswored
          onConfirm={() => setAuthenticated(true)}
        />
      )}
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPost(params.slug + ".md");

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: getAllPostFileNames().map((post) => (
      { params: { slug: post.split(".")[0] } }
    )),
    fallback: false,
  };
}

export default Edit;
