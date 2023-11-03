import Head from "next/head";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useFloating } from "@floating-ui/react";

import { USER } from "../../constants";
import { PostViewer } from "../../components/PostViewer/PostViewer";
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
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    strategy: "fixed",
  });

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
          <nav className={css.navSection}>
            <a href="/">
              <Image
                src={USER.PROFILE_IMAGE_PATH}
                width="40"
                height="40"
                alt={`${USER.NAME} profile image`}
                className={css.profileImage}
              />
            </a>
            <ThemeToggleIcon />
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

          <div className={css.postTab}>
            <div className={css.postContent}>
              <PostViewer markdown={post.body} />
            </div>
            <section className={css.sideTab} ref={refs.setReference}>
              <nav
                className={css.sideNavigation}
                ref={refs.setFloating}
                style={floatingStyles}
              >
                <ul className={css.toc}>
                  {toc.map((header) => {
                    const step = header.step.toString();
                    return (
                      <li
                        key={header.title}
                        className={`${
                          currentTitle === textToSlug(header.title)
                            ? css.highlited
                            : ""
                        } ${css.step[step]} ${css.header}`}
                      >
                        <a href={`#${textToSlug(header.title)}`}>
                          {header.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <div className={css.provider} />
              </nav>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
