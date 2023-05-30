import { SideBar } from "../components/SideBar";
import { PostCell } from "../components/PostCell";
import { PageConsole } from "../components/PageConsole";
import { getAllPostSlug, getPosts, PostMetadata } from "../lib";

import * as css from "./index.css";

import type { GetStaticProps } from "next";

export type PostListPageProps = {
  page: number;
  posts: PostMetadata[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

function PostListPage({
  page,
  posts,
  hasPrevPage,
  hasNextPage,
}: PostListPageProps) {
  return (
    <div className={css.layout}>
      <SideBar />
      <section className={css.mainSection}>
        <h1 className={css.sectionTitle}>
          {page === 1 ? "Posts" : `Page ${page}`}
        </h1>
        <ul className={css.postList}>
          {posts.map((postMetadata) => (
            <PostCell key={postMetadata.title} post={postMetadata} />
          ))}
        </ul>
        <PageConsole hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} />
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async () => {
  try {
    const latestPosts = getPosts({ pageIndex: 1 });
    const hasNextPage = getAllPostSlug().length > 4;

    return {
      props: {
        page: 1,
        posts: latestPosts,
        hasPrevPage: false,
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
