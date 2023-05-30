import { SideBar } from "../../components/SideBar";
import { getPostTags } from "../../lib";
import * as css from "../../components/TagsPage.css";

import type { GetStaticProps } from "next";
import type { TagPair } from "../../lib";

type TagsPageProps = {
  tagPair: TagPair[];
};

function TagsPage({ tagPair }: TagsPageProps) {
  return (
    <div className={css.layout}>
      <SideBar />
      <section className={css.tagsLayout}>
        <h1 className={css.sectionTitle}>Tags</h1>
        <p className={css.tagList}>
          {tagPair.map(([tagName, postCount]) => (
            <span key={tagName} className={css.tag}>
              <span className={css.tagName}>{tagName}</span>
              <span className={css.postCount}>{postCount}</span>
            </span>
          ))}
        </p>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps<TagsPageProps> = async () => {
  try {
    const tagPair = getPostTags();

    return {
      props: {
        tagPair,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default TagsPage;
