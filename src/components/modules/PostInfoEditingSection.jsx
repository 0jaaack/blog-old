import { useCallback } from "react";
import styled from "styled-components";
import TextInput from "../atoms/TextInput";

function PostInfoEditingSection({ onInfoChange }) {
  const handleChange = useCallback((event) => {
    onInfoChange(event.target.name, event.target.value);
  }, [onInfoChange]);

  return (
    <InfoEditingSectionContainer>
      <TextInput
        size={25}
        placeholder="제목"
        name="title"
        onChange={handleChange}
      />
      <TextInput
        size={9}
        placeholder="설명"
        name="description"
        onChange={handleChange}
      />
      <TextInput
        size={9}
        placeholder="#태그 (공백으로 구분)"
        name="tags"
        onChange={handleChange}
      />
    </InfoEditingSectionContainer>
  );
}

const InfoEditingSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  padding: 0 8rem;
`;

export default PostInfoEditingSection;
