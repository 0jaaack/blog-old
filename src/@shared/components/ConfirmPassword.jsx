import { useState } from "react";
import styled from "styled-components";

function ConfirmPassword({ onConfirm }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      return onConfirm();
    }

    setPassword("");
  };

  return (
    <ConfirmPasswordContainer>
      <ConfirmMessage>
        {`
          해당 페이지는 관리자만 접근할 수 있습니다.
          비밀번호를 입력해 관리자 인증을 해주세요
        `}
      </ConfirmMessage>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </form>
    </ConfirmPasswordContainer>
  );
}

const ConfirmPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const ConfirmMessage = styled.div`
  white-space: pre;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  line-height: 2rem;
`;

const PasswordInput = styled.input`
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.color};
  background: transparent;
  color: ${({ theme }) => theme.color};
  font-size: 1.5rem;
  outline: none;
  width: 10rem;

  &-internal-autofill-selected {
    background: transparent;
  }
`;

export default ConfirmPassword;
