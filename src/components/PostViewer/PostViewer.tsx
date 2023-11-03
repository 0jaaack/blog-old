import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";

import { textToSlug } from "../../lib/textToSlug";
import * as css from "./PostViewer.css";

import type { Components } from "react-markdown";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);

const customComponents: Components = {
  a: (props) => <a {...props} className={css.anchorMarkdown} target="_blank" />,
  br: () => <div style={{}} />,
  blockquote: (props) => (
    <blockquote {...props} className={css.blockquoteMarkdown}>
      {props.children}
    </blockquote>
  ),
  h1: (props) => (
    <a href={`#${textToSlug(props.children.toString())}`}>
      <h1
        {...props}
        className={css.h1Markdown}
        id={textToSlug(props.children.toString())}
        children={
          <span>
            <i>#&nbsp;&nbsp;</i>
            {props.children.toString()}
          </span>
        }
      />
    </a>
  ),
  h2: (props) => (
    <a href={`#${textToSlug(props.children.toString())}`}>
      <h2
        {...props}
        className={css.h2Markdown}
        id={textToSlug(props.children.toString())}
        children={
          <span>
            <i>#&nbsp;&nbsp;</i>
            {props.children.toString()}
          </span>
        }
      />
    </a>
  ),
  h3: (props) => (
    <a href={`#${textToSlug(props.children.toString())}`}>
      <h3
        {...props}
        className={css.h3Markdown}
        id={textToSlug(props.children.toString())}
        children={
          <span>
            <i>#&nbsp;&nbsp;</i>
            {props.children.toString()}
          </span>
        }
      />
    </a>
  ),
  ul: (props) => <ul {...props} className={css.listMarkdown} />,
  ol: (props) => <ol {...props} className={css.listMarkdown} />,
  li: (props) => <li {...props} className={css.liMarkdown} />,
  img: (props) => <img {...props} className={css.imageMarkdown} />,
  code: ({ node, inline, className, children, ...props }) => {
    const hasLang = /language-(\w+)/.exec(className || "");

    return !inline && hasLang ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={hasLang[1]}
        PreTag="pre"
        className={css.preMarkdown}
        useInlineStyles={true}
      >
        {children as string}
      </SyntaxHighlighter>
    ) : (
      <code {...props} className={css.inlineCodeMarkdown}>
        {children}
      </code>
    );
  },
  p: (props) => <p {...props} className={css.paragraphMardown} />,
};

export function PostViewer({ markdown }: { markdown: string }) {
  return (
    <article className={css.layout}>
      <ReactMarkdown
        children={markdown}
        components={customComponents}
        className={css.markdown}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      />
    </article>
  );
}
