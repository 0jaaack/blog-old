import Head from "next/head";
import styled from "styled-components";

import PostInfo from "../../postView/components/PostInfo";
import Provider from "../../@shared/components/Provider";
import MarkdownViewer from "../../postEdit/components/MarkdownViewer";
import {
  getAllPostFileNames,
  getPostDetail,
  getPostContent,
} from "../../@shared/services/post";

const components = {
  a: (props) => <a target="_blank" {...props} />,
};

function Post({ title, date, tags, markdown }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="shortcut icon"
          href="/images/profile.PNG"
          type="image/x-icon"
        />
      </Head>
      <PostContainer>
        <PostInfo title={title} published={date} tags={tags} />
        <Provider type="horizon" />
        <MarkdownViewer markdown={markdown} />
      </PostContainer>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: getAllPostFileNames().map((post) => ({
      params: { slug: post.split(".")[0] },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const postFileName = params.slug + ".md";
    const { title, date, tags } = getPostDetail(postFileName);
    const source = getPostContent(postFileName);

    return {
      props: {
        title,
        date,
        tags,
        markdown: source,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const PostContainer = styled.div`
  max-width: 43rem;
  margin: 0 auto;
  padding: 1rem 2rem;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Post;
