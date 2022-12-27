import styled from "styled-components";
import SectionHeader from "../atoms/SectionHeader";
import TagLabel from "../atoms/TagLabel";

const tags = [["JAVASCRIPT", 231], ["adf", 0], ["BLOCKCHAIN", 158], ["REACT", 51], ["TYPESCRIPT", 44], ["BROWSER", 38], ["WEB", 35], ["BITCOIN", 31], ["NODEJS", 29], ["ALGORITHM", 27], ["PYTORCH", 26], ["CRYPTOCURRENCY", 25], ["PYTHON", 13], ["PROGRAMMING", 12], ["MACHINE-LEARNING", 12], ["SMART-CONTRACT", 11], ["NEXTJS", 9], ["AI", 8], ["TENSORFLOW", 8], ["ETHEREUM", 8], ["DIARY", 7], ["HTML", 7], ["GITHUB", 7], ["CSS", 7], ["HEALTHCARE", 7], ["RUST", 6], ["DOCKER", 6], ["NPM", 5], ["CHROME", 5], ["V", 85], ["BLOG", 5], ["GIT", 5], ["MATH", 5], ["KS", 84], ["WEBPACK", 4], ["MOBX", 4], ["SCIKIT-LEARN", 4], ["SMART-GRID", 4], ["EVENT-LOOP", 3], ["ICO", 3], ["ESLINT", 2], ["YARN", 2], ["RETROSPECTIVE", 2], ["FIREBASE", 2], ["TIL", 2], ["INFRASTRUCTURE", 2], ["TOKEN-ECONOMY", 2], ["SOCIAL-IMPACT", 2], ["PNPM", 1], ["REMIX", 1], ["NODE", 1], ["SERVER", 1], ["FRONTEND", 1], ["CI,CD", 1], ["SAFARI", 1], ["SQL", 1], ["VERCEL", 1], ["NEXT", 1], ["JWT", 1], ["HTTP", 1], ["IMAGES", 1], ["MDX", 1], ["TAILWINDCSS", 1], ["WEBSITE", 1], ["GITHUB-ACTIONS", 1], ["PERFORMANCE", 1], ["REGEX", 1], ["SSR", 1], ["APPLE", 1], ["GCP", 1], ["CSS", 1], ["CLOUDINARY", 1], ["PUPPETEER", 1], ["PWA", 1], ["GATSBY", 1], ["STYLEDCOMPONENTS", 1], ["BOOK", 1], ["ANGULAR", 1], ["AWS", 1], ["ENTREPRENEURSHIP", 1], ["RIPPLE", 1], ["FINANCE", 1], ["GOLANG", 1], ["JAVA", 1], ["DELPHI", 1]];

function TagSection() {
  return (
    <TagSectionContainer>
      <SectionHeader>
        Tags
      </SectionHeader>
      <TagList>
        {tags.map(([tagName, postCount]) => (
          <TagCountLabel
            size={8}
            count={postCount}
          >{tagName}&nbsp;</TagCountLabel>
        ))}
      </TagList>
    </TagSectionContainer>
  );
}

const TagSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 40rem;
  padding: 1rem 3rem;
`;

const TagList = styled.div`
  white-space: pre-line;
  line-height: 2.3rem;
`;

const TagCountLabel = styled(TagLabel)`
  &::after {
    content: "${({ count }) => count} ";
    margin-left: 0.2rem;
    margin-right: 0.6rem;
    color: ${({ theme }) => theme.color};
  }
`;

export default TagSection;
