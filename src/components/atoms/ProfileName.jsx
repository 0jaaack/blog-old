import styled from "styled-components";

function ProfileName({ children }) {
  return (
    <ProfileNameText>
      {children}
    </ProfileNameText>
  );
}

const ProfileNameText = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
`;

export default ProfileName;
