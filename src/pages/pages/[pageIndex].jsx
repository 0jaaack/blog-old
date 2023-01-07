import BlogInfoSection from "../../components/sections/BlogInfoSection";
import PostCollectionSection from "../../components/sections/PostCollectionSection";
import Provider from "../../components/atoms/Provider";
import { getPage, getAllPostFileNames } from "../../services/postCollectionService";
import POST from "../../configs/post";
import MainLayout from "../../components/atoms/MainLayout";

function Page({ posts, hasPrevPage, hasNextPage }) {
  return (
    <MainLayout>
      <BlogInfoSection />
      <Provider type="vertical"/>
      <PostCollectionSection
        posts={posts}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
      />
    </MainLayout>
  );
}

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

export default Page;
