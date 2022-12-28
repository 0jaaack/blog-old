import styled from "styled-components";
import PostInfo from "../components/modules/PostInfo";
import Provider from "../components/atoms/Provider";

function Post() {
  return (
    <PostContainer>
      <PostInfo
        title={"바지락 술찜 레시피"}
        published={"2022-12-27"}
        tags={["요리", "안주"]}
      />
      <Provider type="horizon"/>
      <p style={{ whiteSpace: "pre-line", lineHeight: "2rem" }}>
        {`
          1. 바지락을 해감한다. (어케하는지는 잘 모르지만 검색해서 해본다)
          2. 후라이팬에 버터를 두르고, 양파와 마늘을 볶는다.
          3. 어느정도 볶아지면 해감해둔 바지락을 넣는다.
          4. 술 100ml와 물을 넣는다. 술 많이 남았다고 다 넣으면 안된다.
          5. 페퍼론치노와 후추를 넣는다. 많이 넣으면 짜다.
          6. 다 익으면 맛있게 먹는다.
        `}
      </p>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  width: 100vw;
  padding: 3rem 23vw;
`;

export default Post;
