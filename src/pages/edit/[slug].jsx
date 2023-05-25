import PostWritingSection from "../../src/postEdit/components/PostEditing";
import { getPost, getAllPostFileNames } from "../../src/@shared/services/post";

function Edit({ post }) {
  const postData = {
    ...post,
    tags: post.tags.map((tag) => "#" + tag).join(" "),
  };

  return (
    <PostWritingSection post={postData} />
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
