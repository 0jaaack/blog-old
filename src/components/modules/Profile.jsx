import styled from "styled-components";

import ProfileImage from "../atoms/ProfileImage";
import ProfileName from "../atoms/ProfileName";
import ProfileDescription from "../atoms/ProfileDescription";

function Profile() {
  return (
    <Container>
      <ProfileImage
        src="/images/profile.png"
      />
      <ProfileName>
        ponjaehyeok
      </ProfileName>
      <ProfileDescription>
        최대한 깊게 개념을 탐구해보고, 기록하기 위한 블로그. 파고 또 파고..
      </ProfileDescription>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  padding-left: 0;
`;

export default Profile;
