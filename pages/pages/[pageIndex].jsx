import POST from "../../src/@shared/constants/post";
import MainLayout from "../../src/@shared/components/Layout";
import SideBar from "../../src/main/components/SideBar";
import Provider from "../../src/@shared/components/Provider";
import Main from "../../src/main/components/Main";
import { getPage, getAllPostFileNames } from "../../src/@shared/services/post";

function Page({ posts, hasPrevPage, hasNextPage }) {
  return (
    <MainLayout>
      <SideBar />
      <Provider type="vertical"/>
      <Main
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
