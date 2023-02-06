import SideBar from "../../main/components/SideBar";
import Provider from "../../shared/components/Provider";
import Main from "../../main/components/Main";
import { getPage, getAllPostFileNames } from "../../shared/services/post";
import POST from "../../configs/post";
import MainLayout from "../../components/atoms/MainLayout";

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
