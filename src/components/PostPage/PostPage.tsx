import { textToSlug } from "../../lib/textToSlug";
import { createTOC } from "../../utils";
import { USER } from "../../constants";
import * as css from "../../components/PostPage/PostPage.css";
import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { PostViewer } from "../../components/PostViewer/PostViewer";
import { ThemeToggleIcon } from "../ThemeToggleIcon/ThemeToggleIcon";

export function PostPage({ post }: PostPageProps) {
  const { title, description, date, tags } = post.metadata;
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
  const scrollArea = useRef<HTMLDivElement>(null);
  const toc = useMemo(() => createTOC(post.body), [post.body]);

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
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <div className={css.layout} ref={scrollArea}>
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

          <section className={css.sideTab}>
            <nav>
              <ul className={css.toc}>
                {toc.map((header) => {
                  const step = header.step.toString();
                  return (
                    <li
                      className={`${
                        currentTitle === textToSlug(header.title)
                          ? css.highlited
                          : ""
                      } ${css.step[step]}`}
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
    </>
  );
}
