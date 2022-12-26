import styled from "styled-components";

function ProfileDescription({ children }) {
  return (
    <ProfileDescriptionText>
      {children}
    </ProfileDescriptionText>
  );
}

const ProfileDescriptionText = styled.p`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 0.8rem;
  line-height: 1.3rem;
  white-space: pre-line;
`;
export default ProfileDescription;
