import { useCallback, useState } from "react";
import styled from "styled-components";
import useDebounce from "../../hooks/useDebounce";
import TextInput from "../atoms/TextInput";

function PostInfoEditingSection({ onInfoChange, infoValues = {} }) {
  const [values, setValues] = useState(infoValues);
  const onDebouncedInfoChange = useDebounce(onInfoChange, 500);
  const handleChange = useCallback(({ target: { name, value } }) => {
    setValues(prev => ({ ...prev, [name]: value }));
    onDebouncedInfoChange(name, value);
  }, [onInfoChange]);

  return (
    <InfoEditingSectionContainer>
      <TextInput
        size={25}
        placeholder="제목"
        name="title"
        value={values.title ?? ""}
        onChange={handleChange}
      />
      <TextInput
        size={9}
        placeholder="설명"
        name="description"
        value={values.description ?? ""}
        onChange={handleChange}
      />
      <TextInput
        size={9}
        placeholder="#태그 (공백으로 구분)"
        name="tags"
        value={values.tags ?? ""}
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
`;

export default PostInfoEditingSection;
