import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { USER } from "../../constants";
import { PostViewer } from "../PostViewer/PostViewer";
import { Comments } from "../Comments/Comments";
import { ThemeToggleIcon } from "../ThemeToggleIcon/ThemeToggleIcon";
import { textToSlug } from "../../lib/textToSlug";
import { createTOC } from "../../utils";

import * as css from "../../components/PostPage/PostPage.css";

import type { Post } from "../../lib";

export type PostPageProps = {
  post: Post;
};

export function PostPage({ post }: PostPageProps) {
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
  const { title, description, date, tags } = post.metadata;
  const toc = useMemo(() => createTOC(post.body), [post.body]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const currentTitle = entries.find(
          (entry) => entry.intersectionRatio > 0.9
        )?.target.id;

        if (!currentTitle) {
          return;
        }

        setCurrentTitle(currentTitle);
      },
      {
        root: document.getElementById("scrollArea"),
        rootMargin: "-200px 0px",
        threshold: 1,
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
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <div className={css.scrollArea} id="scrollArea">
        <div className={css.layout}>
          <div className={css.sideTabLayout}>
            <section className={css.sideTab}>
              <nav className={css.sideNavigation}>
                <ul className={css.toc}>
                  {toc.map((header) => (
                    <li
                      key={header.title}
                      className={`${
                        currentTitle === textToSlug(header.title)
                          ? css.highlited
                          : ""
                      }`}
                    >
                      <a
                        href={`#${textToSlug(header.title)}`}
                        className={css.header}
                      >
                        {header.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className={css.provider} />
              </nav>
              <nav className={css.navSection}>
                <a href="/">
                  <Image
                    src={"images/home.svg"}
                    width="40"
                    height="40"
                    alt={`${USER.NAME} profile image`}
                    className={css.profileImage}
                  />
                </a>
                <ThemeToggleIcon />
              </nav>
            </section>
          </div>

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

          <div className={css.postTab}>
            <div className={css.postContent}>
              <PostViewer markdown={post.body} />
            </div>
          </div>

          <Comments />
        </div>
      </div>
    </>
  );
}
