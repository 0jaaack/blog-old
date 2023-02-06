import styled from "styled-components";
import Image from "next/image";
import USER from "../constants/user";

function Profile() {
  return (
    <ProfileContainer>
      <ProfileImage
        src="/images/profile.PNG"
        width={84}
        height={84}
        alt={`${USER.NAME}-profile-image`}
      />
      <ProfileName>
        {USER.NAME}
      </ProfileName>
      <ProfileDescription>
        {USER.DESCRIPTION}
      </ProfileDescription>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
`;

const ProfileName = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
`;

const ProfileDescription = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.grey};
  line-height: 1.3rem;
  white-space: pre-line;
`;

export default Profile;
