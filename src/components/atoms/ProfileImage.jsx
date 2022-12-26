import Image from "next/image";
import styled from "styled-components";

function ProfileImage({ src }) {
  return (
    <ProfileMainImage
      src={src}
      height={84}
      width={84}
      alt="ponjaehyeok-profile"
    />
  );
}

const ProfileMainImage = styled(Image)`
  border: 0.5px solid black;
  border-radius: 50%;
`;

export default ProfileImage;
