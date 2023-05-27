import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rangeParser from "parse-numeric-range";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";

import { textToSlug } from "../lib/textToSlug";
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
  br: () => <div style={{ marginBottom: "1rem" }} />,
  h3: (props) => (
    <a href={`#${props.children.toString()}`}>
      <h3
        {...props}
        className={css.h3Markdown}
        id={textToSlug(props.children.toString())}
        children={
          <span>
            <i>###&nbsp;&nbsp;</i>
            {props.children.toString()}
          </span>
        }
      />
    </a>
  ),
  li: (props) => <li {...props} className={css.liMarkdown} />,
  img: (props) => (
    <Image
      {...props}
      src={props?.src ?? ""}
      alt={props?.alt ?? ""}
      width={Number(props?.height ?? 0)}
      height={Number(props?.height ?? 0)}
      placeholder={
        props.placeholder === "empty" || props.placeholder === "blur"
          ? props.placeholder
          : "empty"
      }
    />
  ),
  code: ({ node, inline, className, children, ...props }) => {
    const hasLang = /language-(\w+)/.exec(className || "");
    const hasMeta = node?.data?.meta;
    const applyHighlights: object = (applyHighlights: number) => {
      if (hasMeta) {
        const RE = /{([\d,-]+)}/;
        const metadata = node.data?.meta?.replace(/\s/g, "");
        const strlineNumbers = RE.test(metadata)
          ? RE.exec(metadata)?.[1] ?? "0"
          : "0";
        const highlight = rangeParser(strlineNumbers);
        const data: string = highlight.includes(applyHighlights)
          ? "highlight"
          : null;

        return { data };
      } else {
        return {};
      }
    };

    return !inline ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={hasLang[1]}
        PreTag="pre"
        className={css.preMarkdown}
        wrapLines={hasMeta}
        useInlineStyles={true}
        lineProps={applyHighlights}
      >
        {children as string}
      </SyntaxHighlighter>
    ) : (
      <code {...props} className={className}>
        {children}
      </code>
    );
  },
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
