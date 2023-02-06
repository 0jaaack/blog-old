import { useRouter } from "next/router";
import styled from "styled-components";
import LinkButton from "../../@shared/components/LinkButton";

function PageConsole({ hasPrevPage, hasNextPage }) {
  const { query: { pageIndex = 1 } } = useRouter();

  return (
    <PageConsoleContainer>
      {hasPrevPage && (
        <PageLinkButton
          href={`/pages/${Number(pageIndex) - 1}`}
          size={9}
          color="blue"
          float="left"
        >
          &larr; Page {Number(pageIndex) - 1}
        </PageLinkButton>
      )}
      {hasNextPage && (
        <PageLinkButton
          href={`/pages/${Number(pageIndex) + 1}`}
          size={9}
          color="blue"
          float="right"
        >
          Page {Number(pageIndex) + 1} &rarr;
        </PageLinkButton>
      )}
    </PageConsoleContainer>
  );
}

const PageConsoleContainer = styled.div`
  display: flex;
`;

const PageLinkButton = styled(LinkButton)`
  margin-left: ${({ float }) => float === "right" ? "auto" : 0};
  margin-right: ${({ float }) => float === "left" ? "auto" : 0};
`;

export default PageConsole;
