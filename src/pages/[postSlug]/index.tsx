import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { PostViewer } from "../../components/PostViewer";
import { getAllPostSlug, getPostBySlug } from "../../lib";
import { textToSlug } from "../../lib/textToSlug";
import { createTOC } from "../../utils";
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
  const toc = createTOC(post.body);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
  const scrollArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const currentTitle = entries.find((entry) => entry.isIntersecting)
          ?.target.id;

        if (!currentTitle) {
          return;
        }

        setCurrentTitle(currentTitle);
      },
      {
        root: scrollArea.current,
        threshold: 1.0,
      }
    );
    const postTitles = toc.map((header) => header.title);
    const unobservers: (() => void)[] = [];

    for (const title of postTitles) {
      const titleElement = document.getElementById(textToSlug(title));

      if (!titleElement) {
        continue;
      }

      observer.observe(titleElement);
      unobservers.push(() => observer.unobserve(titleElement));
    }

    return () => {
      for (const unobserver of unobservers) {
        unobserver();
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={css.layout} ref={scrollArea}>
        <section className={css.sideTab} />

        <div className={css.postTab}>
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
                <li key={route.page}>
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

          <div className={css.postInfo}>
            <p className={css.postTitle}>{title}</p>
            <p className={css.date}>{date}</p>
            <p className={css.tagList}>
              {tags.map((tag) => (
                <span key={tag} className={css.tagLabel}>
                  {tag}
                </span>
              ))}
            </p>
          </div>

          <div className={css.provider} />

          <div className={css.postContent}>
            <PostViewer markdown={post.body} />
          </div>
        </div>

        <section className={css.sideTab}>
          <nav>
            <ul className={css.toc}>
              {toc.map((header) => (
                <li
                  className={
                    currentTitle === textToSlug(header.title)
                      ? css.highlited
                      : ""
                  }
                >
                  <a href={`#${textToSlug(header.title)}`}>{header.title}</a>
                </li>
              ))}
            </ul>
            <div className={css.provider} />
          </nav>
        </section>
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
