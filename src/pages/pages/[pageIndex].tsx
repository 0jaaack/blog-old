import { POST } from "../../constants/post";

import { getPosts, getAllPostSlug } from "../../lib";
import PostListPage from "../index";

import type { GetStaticPaths, GetStaticProps } from "next";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import type { PostListPageProps } from "../index";

export const getStaticPaths: GetStaticPaths = async () => {
  const maxPage = Math.ceil(
    getAllPostSlug().length / POST.DEFAULT_NUMBER_OF_POSTS
  );

  return {
    paths: Array.from({ length: maxPage }, (v, i) => ({
      params: {
        pageIndex: `${i + 1}`,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostListPageProps> = async ({
  params,
}: {
  params?: Params;
}) => {
  try {
    const maxPage = Math.ceil(
      getAllPostSlug().length / POST.DEFAULT_NUMBER_OF_POSTS
    );
    const page = Number(params?.pageIndex ?? "1");
    const posts = getPosts({ pageIndex: page });

    if (posts.length === 0) {
      return {
        notFound: true,
      };
    }

    const hasNextPage = params?.pageIndex !== maxPage.toString();
    const hasPrevPage = params?.pageIndex !== "1";

    return {
      props: {
        page,
        posts,
        hasPrevPage,
        hasNextPage,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default PostListPage;
