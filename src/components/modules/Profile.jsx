import styled from "styled-components";

import ProfileImage from "../atoms/ProfileImage";
import ProfileName from "../atoms/ProfileName";
import ProfileDescription from "../atoms/ProfileDescription";

function Profile() {
  return (
    <ProfileContainer>
      <ProfileImage
        src="/images/profile.png"
      />
      <ProfileName>
        ponjaehyeok
      </ProfileName>
      <ProfileDescription>
        {`최대한 깊게 개념을 탐구해보고, 기록하기 위한 블로그
        파고 또 파고..`}
      </ProfileDescription>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default Profile;
