import styled from "styled-components";

import ProfileImage from "../atoms/ProfileImage";
import ProfileName from "../atoms/ProfileName";
import Description from "../atoms/Description";

function Profile() {
  return (
    <ProfileModuleContainer>
      <ProfileImage
        src="/images/profile.PNG"
        size={84}
      />
      <ProfileName>
        ponjaehyeok
      </ProfileName>
      <ProfileDescription size={8}>
        {`최대한 깊게 개념을 탐구해보고, 기록하기 위한 블로그
        파고 또 파고..`}
      </ProfileDescription>
    </ProfileModuleContainer>
  );
}

const ProfileModuleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileDescription = styled(Description)`
  line-height: 1.3rem;
  white-space: pre-line;
`;

export default Profile;
