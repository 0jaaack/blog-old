import BlogInfoSection from "../../components/sections/BlogInfoSection";
import PostSection from "../../components/sections/PostSection";
import Provider from "../../components/atoms/Provider";
import { getPage, getAllPostFileNames } from "../../services/postService";
import POST from "../../configs/post";
import MainLayout from "../../components/atoms/MainLayout";

const maxPage = Math.ceil(getAllPostFileNames().length / POST.DEFAULT_NUMBER_OF_POSTS);

export async function getStaticPaths() {
  return {
    paths: Array.from(
      new Array(maxPage),
      (v, i) => ({ params: { pageIndex: `${i + 1}` }})
    ),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const posts = getPage(Number(params.pageIndex));

    if (posts.length === 0) {
      return {
        notFound: true,
      };
    }

    const hasNextPage = params.pageIndex !== maxPage.toString();
    const hasPrevPage = params.pageIndex !== "1";

    return {
      props: {
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
}

function Page({ posts, hasPrevPage, hasNextPage }) {
  return (
    <MainLayout>
      <BlogInfoSection />
      <Provider type="vertical"/>
      <PostSection
        posts={posts}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
      />
    </MainLayout>
  );
}

export default Page;
