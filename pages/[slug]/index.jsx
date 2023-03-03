import Head from "next/head";
import styled from "styled-components";
import prism from "@mapbox/rehype-prism";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

import PostInfo from "../../src/postView/components/PostInfo";
import Provider from "../../src/@shared/components/Provider";
import Markdown from "../../src/postEdit/components/Markdown";
import { getAllPostFileNames, getPostDetail, getPostContent } from "../../src/@shared/services/post";

const components = {
  a: (props) => <a target="_blank" {...props} />
};

function Post({ title, date, tags, markdown }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/images/profile.PNG" type="image/x-icon" />
      </Head>
      <PostContainer>
        <PostInfo
          title={title}
          published={date}
          tags={tags}
        />
        <Provider type="horizon"/>
        <Markdown>
          <MDXRemote components={components} {...markdown} />
        </Markdown>
        </PostContainer>
      </>
  );
}

export async function getStaticPaths() {
  return {
    paths: getAllPostFileNames().map((post) => (
      { params: { slug: post.split(".")[0] } }
    )),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const postFileName = params.slug + ".md";
    const { title, date, tags } = getPostDetail(postFileName);
    const source = getPostContent(postFileName);
    const markdown = await serialize(source, {
      mdxOptions: {
        development: false,
        rehypePlugins: [prism],
      },
    });

    return {
      props: {
        title, date, tags, markdown
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const PostContainer = styled.div`
  width: 50rem;
  min-width: 30rem;
  margin: 0 auto;
  padding: 3rem;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Post;
