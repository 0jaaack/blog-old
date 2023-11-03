import { getAllPostSlug, getPostBySlug } from "../../lib";
import { PostPage, PostPageProps } from "../../components/PostPage/PostPage";

import type { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllPostSlug().map((postSlug) => ({
      params: {
        postSlug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  try {
    if (!params?.postSlug || Array.isArray(params?.postSlug)) {
      throw new Error();
    }

    const post = getPostBySlug(params.postSlug);

    return {
      props: {
        post,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default PostPage;
