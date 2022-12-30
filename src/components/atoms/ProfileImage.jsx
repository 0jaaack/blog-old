import Image from "next/image";
import styled from "styled-components";

function ProfileImage({ src, size }) {
  return (
    <ProfileMainImage
      src={src}
      height={size}
      width={size}
      alt="ponjaehyeok-profile"
    />
  );
}

const ProfileMainImage = styled(Image)`
  border-radius: 50%;
`;

export default ProfileImage;
