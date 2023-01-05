import { useState } from "react";
import styled from "styled-components";

import PostInfoEditingSection from "../modules/PostInfoEditingSection";
import MarkdownViewer from "../atoms/MarkdownViewer";
import MarkdownEditor from "../atoms/MarkdownEditor";
import Button from "../atoms/Button";
import { publishPost } from "../../utils/publishPost";

function PostWritingSection() {
  const [isViewMode, setIsViewMode] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [postConfig, setPostConfig] = useState({});

  const handleRegister = async () => {
    const isPublish = confirm("포스트를 등록하시겠습니까?");

    if (
      !isPublish
      || !postConfig.title
      || !postConfig.description
      || !postConfig.body
    ) {
      return;
    }
    const tagsArray = postConfig.tags
      ?.split("#")
      .slice(1)
      .map((tag) => tag.trim()) ?? [];

    const result = publishPost(Object.assign(postConfig, { tags: tagsArray }));

    alert(result);
  };

  const handleChange = (target, value) => {
    setPostConfig(prev => ({
      ...prev,
      [target]: value
    }));
  };

  return (
    <PostContainer>
      <ConsoleSection>
        <Button onClick={() => setIsPublished(!isPublished)}>
          {isPublished ? "공개" : "비공개"}
        </Button>
        <Button onClick={() => setIsViewMode(prev => !prev)}>
          {isViewMode ? "Viewer" : "Editor"}
        </Button>
        <Button onClick={handleRegister}>
          등록하기
        </Button>
      </ConsoleSection>
      <PostInfoEditingSection onInfoChange={handleChange}/>
      <ContentEditingSection>
        {isViewMode ? (
          <MarkdownViewer
            markdown={postConfig.body ?? ""}
          />
        ) : (
          <MarkdownEditor
            value={postConfig.body ?? ""}
            onChange={(value) => handleChange("body", value)}
          />
        )}
      </ContentEditingSection>
    </PostContainer>
  );
}


const PostContainer = styled.div`
  margin: 0 auto;
  padding: 2rem 20vw;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  height: 100vh;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ConsoleSection = styled.div`
  display: flex;
  justify-content: end;
  height: 3rem;
  width: 100%;
`;

const ContentEditingSection = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  overflow: scroll;
`;

export default PostWritingSection;
