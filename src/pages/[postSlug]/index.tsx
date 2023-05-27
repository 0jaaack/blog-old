import Head from "next/head";
import Image from "next/image";

import { PostViewer } from "../../components/PostViewer";
import { getAllPostSlug, getPost } from "../../lib";
import { USER } from "../../constants/user";
import { NAVIGATION_ROUTES } from "../../components/SideBar";
import * as css from "./index.css";

import type { GetStaticPaths, GetStaticProps } from "next";
import type { Post } from "../../lib";

type PostPageProps = {
  post: Post;
};

function PostPage({ post }: PostPageProps) {
  const { title, date, tags } = post.metadata;
  const tableOfContents = post.body
    .split(`\n`)
    .filter((line) => line[0] === "#");

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={css.aa}>
        <div className={css.postNav} />

        <div className={css.layout}>
          <nav className={css.navSection}>
            <a href="/">
              <Image
                src={USER.PROFILE_IMAGE_PATH}
                width={60}
                height={60}
                alt={`${USER.NAME} profile image`}
                className={css.profileImage}
              />
            </a>

            <ul className={css.routeLinks}>
              {NAVIGATION_ROUTES.map((route) => (
                <li>
                  <a href={route.href} className={css.route}>
                    {route.page}
                  </a>
                </li>
              ))}
              <Image
                src="/images/sun.svg"
                alt="toggle dark mode"
                width="30"
                height="30"
              />
            </ul>
          </nav>

          <section className={css.postInfo}>
            <p className={css.postTitle}>{title}</p>
            <p className={css.date}>{date}</p>
            <p className={css.tagList}>
              {tags.map((tag) => (
                <span key={tag} className={css.tagLabel}>
                  {tag}
                </span>
              ))}
            </p>
          </section>

          <div className={css.provider} />

          <section className={css.postContent}>
            <PostViewer markdown={post.body} />
          </section>
        </div>

        <nav className={css.postNav}>
          <ul className={css.toc}>
            {tableOfContents.map((title) => (
              <li>{title}</li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

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

    const post = getPost(params.postSlug);

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
