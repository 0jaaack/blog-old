import styled from "styled-components";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import prism from "@mapbox/rehype-prism";
import ReactMarkdown from "react-markdown";

import Markdown from "./Markdown";

const components = {
  br: () => <div style={{ marginBottom: "1rem" }} />,
};

function MarkdownViewer({ markdown }) {
  return (
    <ViewerContainer>
      <ReactMarkdown
        children={markdown}
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, prism]}
      />
    </ViewerContainer>
  );
}

const ViewerContainer = styled(Markdown)`
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default MarkdownViewer;
