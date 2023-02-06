import { useState, useCallback } from "react";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";

function MarkdownEditor({ value = "", onChange, ...props }) {
  const [editorText, setEditorText] = useState(value);
  const submitChange = useDebounce(onChange, 500);
  const handleChange = useCallback((event) => {
    const text = event.target.value;
    setEditorText(text);
    submitChange(text);
  }, []);

  return (
    <Editor
      autoFocus
      placeholder="포스트 입력..."
      onChange={handleChange}
      value={editorText}
      {...props}
    />
  );
}

const Editor = styled.textarea`
  display: block;
  background: #202937;
  color: #D1D5DB;
  line-height: 1.6rem;
  padding: 2rem;
  border-radius: 0.5rem;
  outline: none;
  width: 100%;
  resize: none;
  height: 100%;
  border: 0;
  overflow: visible;
  font: inherit;
  font-size: 0.85rem;
  letter-spacing: 0.04rem;
`;

export default MarkdownEditor;
