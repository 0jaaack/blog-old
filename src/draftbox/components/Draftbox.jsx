import { useState, useMemo } from "react";
import styled from "styled-components";

import SectionHeader from "../../@shared/components/SectionHeader"
import Button from "../../@shared/components/Button";
import Provider from "../../@shared/components/Provider";
import DraftPostCell from "./DraftPostCell";

function Draftbox({ posts }) {
  const [index, setIndex] = useState(1);
  const currentPosts = useMemo(() => (posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice((index - 1) * 10, index * 10)
  ), [index]);
  const hasNextPosts = posts.length - index * 10 > 0;

  const handleLeftArrClick = () => {
    index !== 1 && setIndex(prev => prev - 1);
  };

  const handleRightArrClick = () => {
    hasNextPosts && setIndex(prev => prev + 1);
  };

  return (
    <PostManageContainer>
      <SectionHeader size={24}>
        Manage
      </SectionHeader>
      <IndexConsole>
        <Button size={14} onClick={handleLeftArrClick}>
          &larr;
        </Button>
        <Button size={14} onClick={handleRightArrClick}>
          &rarr;
        </Button>
      </IndexConsole>
      <Provider type="horizon" />
      <PostManageList>
        {currentPosts.map((post) => (
          <DraftPostCell key={post.title} post={post} />
        ))}
      </PostManageList>
      <Provider type="horizon" />
    </PostManageContainer>
  );
}

const PostManageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 56vw;
`;

const IndexConsole = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.8rem;
`;

const PostManageList = styled.ul`
  padding: 0;
`;

export default Draftbox;
