import Head from "next/head";

import Profile from "../components/Profile";
import Navigation from "../components/Navigation";
import PostCell from "../components/PostCell";
import { getPage, getAllPostSlug, PostMetadata } from "../lib";
import * as css from "./index.css";

function HomePage({
  latestPosts,
  hasNextPage,
}: {
  latestPosts: PostMetadata[];
  hasNextPage: boolean;
}) {
  return (
    <>
      <Head>
        <title>ponjaehyeok.dev</title>
        <meta name="description" content="ponjaehyeok blog" />
        <link
          rel="shortcut icon"
          href="/images/profile.PNG"
          type="image/x-icon"
        />
      </Head>
      <div className={css.laylout}>
        <section className={css.sideBar}>
          <Profile />
          <Navigation />
        </section>
        <div className={css.provider} />
        <section className={css.mainSection}>
          <h1 className={css.sectionTitle}>Posts</h1>
          <ul className={css.postList}>
            {latestPosts.map((postMatadata) => (
              <PostCell
                key={postMatadata.title}
                title={postMatadata.title}
                description={postMatadata.description}
                tags={postMatadata.tags}
                published={postMatadata.date}
              />
            ))}
          </ul>
          <div className={css.pageConsole}>
            <span className={css.pageButton}>&larr; Previous</span>
            <span className={css.pageButton}>Next &rarr;</span>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const latestPosts = getPage({ pageIndex: 1 });
    const hasNextPage = getAllPostSlug().length > 4;

    return {
      props: {
        latestPosts,
        hasNextPage,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true,
    };
  }
}

export default HomePage;
